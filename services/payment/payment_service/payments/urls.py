from django.urls import path
from .views import HealthView, PaymentListView, PaymentDetailView, RefundView

urlpatterns = [
    path("health", HealthView.as_view(), name="health"),
    path("", PaymentListView.as_view(), name="payment-list"),
    path("<uuid:payment_id>", PaymentDetailView.as_view(), name="payment-detail"),
    path("<uuid:payment_id>/refund", RefundView.as_view(), name="payment-refund"),
]
