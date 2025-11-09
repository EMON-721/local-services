import { RabbitMQClient, Exchanges, RoutingKeys } from "@local-services/rabbitmq-client";
import type { PaymentCompletedEvent } from "@local-services/types";
import { prisma } from "./database";

let rabbitmqClient: RabbitMQClient;

export async function initializeRabbitMQ() {
  rabbitmqClient = new RabbitMQClient({
    url: process.env.RABBITMQ_URL || "amqp://admin:admin@localhost:5672",
  });

  await rabbitmqClient.connect();

  // Listen for payment events
  await rabbitmqClient.consume<PaymentCompletedEvent>(
    {
      queue: "orders.payment-events",
      exchange: Exchanges.EVENTS,
      routingKey: "payment.*",
    },
    async (event) => {
      console.log("Received payment event:", event);

      if (event.eventType === "payment.completed") {
        const { orderId } = event.payload;
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "CONFIRMED" },
        });
        console.log(`Order ${orderId} confirmed after payment`);
      }
    }
  );
}

export async function publishOrderPlaced(orderId: string, userId: string, totalAmount: number) {
  if (!rabbitmqClient) {
    console.error("RabbitMQ not initialized");
    return;
  }

  await rabbitmqClient.publish(
    {
      eventType: "order.placed",
      timestamp: new Date().toISOString(),
      correlationId: crypto.randomUUID(),
      payload: {
        orderId,
        userId,
        totalAmount,
        items: [],
      },
    },
    {
      exchange: Exchanges.EVENTS,
      routingKey: RoutingKeys.ORDER_PLACED,
    }
  );
}

export { rabbitmqClient };
