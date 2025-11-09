import uuid
from datetime import datetime
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Payment, Transaction, PaymentStatus, TransactionType, TransactionStatus
from .serializers import PaymentSerializer, CreatePaymentSerializer, CreateRefundSerializer
from ..core.rabbitmq import rabbitmq_publisher


class HealthView(APIView):
    def get(self, request):
        return Response({"status": "healthy", "service": "payment"})


class PaymentListView(APIView):
    def get(self, request):
        user_id = request.query_params.get("user_id")
        if not user_id:
            return Response(
                {"success": False, "error": {"message": "user_id required"}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        payments = Payment.objects.filter(user_id=user_id)
        serializer = PaymentSerializer(payments, many=True)

        return Response({"success": True, "data": serializer.data})

    def post(self, request):
        serializer = CreatePaymentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"success": False, "error": {"message": serializer.errors}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = serializer.validated_data

        # Create payment
        payment = Payment.objects.create(
            order_id=data["order_id"],
            user_id=data["user_id"],
            amount=data["amount"],
            method=data["method"],
            status=PaymentStatus.PROCESSING,
        )

        # Create transaction record
        Transaction.objects.create(
            payment=payment,
            type=TransactionType.CHARGE,
            amount=data["amount"],
            status=TransactionStatus.PENDING,
        )

        # Simulate payment processing (in real app, call payment gateway)
        # For now, just mark as completed
        payment.status = PaymentStatus.COMPLETED
        payment.save()

        # Update transaction
        transaction = payment.transactions.first()
        transaction.status = TransactionStatus.SUCCESS
        transaction.save()

        # Publish payment completed event
        try:
            rabbitmq_publisher.publish(
                "payment.completed",
                {
                    "eventType": "payment.completed",
                    "timestamp": datetime.utcnow().isoformat(),
                    "correlationId": str(uuid.uuid4()),
                    "payload": {
                        "paymentId": str(payment.id),
                        "orderId": payment.order_id,
                        "userId": payment.user_id,
                        "amount": float(payment.amount),
                        "currency": payment.currency,
                        "method": payment.method,
                    },
                },
            )
        except Exception as e:
            print(f"Failed to publish event: {e}")

        return Response(
            {"success": True, "data": PaymentSerializer(payment).data},
            status=status.HTTP_201_CREATED,
        )


class PaymentDetailView(APIView):
    def get(self, request, payment_id):
        try:
            payment = Payment.objects.get(id=payment_id)
        except Payment.DoesNotExist:
            return Response(
                {"success": False, "error": {"message": "Payment not found"}},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = PaymentSerializer(payment)
        return Response({"success": True, "data": serializer.data})


class RefundView(APIView):
    def post(self, request, payment_id):
        try:
            payment = Payment.objects.get(id=payment_id)
        except Payment.DoesNotExist:
            return Response(
                {"success": False, "error": {"message": "Payment not found"}},
                status=status.HTTP_404_NOT_FOUND,
            )

        if payment.status != PaymentStatus.COMPLETED:
            return Response(
                {"success": False, "error": {"message": "Payment cannot be refunded"}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = CreateRefundSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"success": False, "error": {"message": serializer.errors}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = serializer.validated_data

        if data["amount"] > payment.amount:
            return Response(
                {"success": False, "error": {"message": "Refund amount exceeds payment"}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create refund
        from .models import Refund

        refund = Refund.objects.create(
            payment=payment,
            amount=data["amount"],
            reason=data["reason"],
            status="completed",
        )

        # Update payment status if full refund
        if data["amount"] == payment.amount:
            payment.status = PaymentStatus.REFUNDED
            payment.save()

        # Publish refund event
        try:
            rabbitmq_publisher.publish(
                "payment.refunded",
                {
                    "eventType": "payment.refunded",
                    "timestamp": datetime.utcnow().isoformat(),
                    "correlationId": str(uuid.uuid4()),
                    "payload": {
                        "paymentId": str(payment.id),
                        "refundId": str(refund.id),
                        "amount": float(refund.amount),
                    },
                },
            )
        except Exception as e:
            print(f"Failed to publish event: {e}")

        return Response(
            {"success": True, "data": PaymentSerializer(payment).data},
            status=status.HTTP_200_OK,
        )
