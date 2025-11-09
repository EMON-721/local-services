// Base event interface
export interface BaseEvent<T = unknown> {
  eventType: string;
  timestamp: string;
  correlationId: string;
  payload: T;
}

// User events
export interface UserCreatedPayload {
  userId: string;
  email: string;
  role: "customer" | "technician" | "admin";
  firstName?: string;
  lastName?: string;
}

export interface UserCreatedEvent extends BaseEvent<UserCreatedPayload> {
  eventType: "user.created";
}

// Order events
export interface OrderPlacedPayload {
  orderId: string;
  userId: string;
  items: Array<{
    serviceId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

export interface OrderPlacedEvent extends BaseEvent<OrderPlacedPayload> {
  eventType: "order.placed";
}

export interface OrderStatusChangedPayload {
  orderId: string;
  previousStatus: string;
  newStatus: string;
  updatedBy?: string;
}

export interface OrderStatusChangedEvent
  extends BaseEvent<OrderStatusChangedPayload> {
  eventType: "order.status_changed";
}

// Payment events
export interface PaymentCompletedPayload {
  paymentId: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  method: "card" | "bank_transfer" | "cash";
}

export interface PaymentCompletedEvent
  extends BaseEvent<PaymentCompletedPayload> {
  eventType: "payment.completed";
}

export interface PaymentFailedPayload {
  paymentId: string;
  orderId: string;
  userId: string;
  reason: string;
}

export interface PaymentFailedEvent extends BaseEvent<PaymentFailedPayload> {
  eventType: "payment.failed";
}

// Notification events
export interface NotificationSentPayload {
  notificationId: string;
  userId: string;
  channel: "email" | "sms" | "push";
  templateId: string;
}

export interface NotificationSentEvent
  extends BaseEvent<NotificationSentPayload> {
  eventType: "notification.sent";
}

// Union type of all events
export type DomainEvent =
  | UserCreatedEvent
  | OrderPlacedEvent
  | OrderStatusChangedEvent
  | PaymentCompletedEvent
  | PaymentFailedEvent
  | NotificationSentEvent;

// Event type constants
export const EventTypes = {
  USER_CREATED: "user.created",
  ORDER_PLACED: "order.placed",
  ORDER_STATUS_CHANGED: "order.status_changed",
  PAYMENT_COMPLETED: "payment.completed",
  PAYMENT_FAILED: "payment.failed",
  NOTIFICATION_SENT: "notification.sent",
} as const;
