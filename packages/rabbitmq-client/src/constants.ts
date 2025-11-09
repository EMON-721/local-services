// Exchange names
export const Exchanges = {
  EVENTS: "local-services.events",
  DEAD_LETTER: "local-services.dead-letter",
} as const;

// Routing keys for events
export const RoutingKeys = {
  // User events
  USER_CREATED: "user.created",
  USER_UPDATED: "user.updated",
  USER_DELETED: "user.deleted",

  // Order events
  ORDER_PLACED: "order.placed",
  ORDER_CONFIRMED: "order.confirmed",
  ORDER_ASSIGNED: "order.assigned",
  ORDER_STATUS_CHANGED: "order.status_changed",
  ORDER_COMPLETED: "order.completed",
  ORDER_CANCELLED: "order.cancelled",

  // Payment events
  PAYMENT_INITIATED: "payment.initiated",
  PAYMENT_COMPLETED: "payment.completed",
  PAYMENT_FAILED: "payment.failed",
  PAYMENT_REFUNDED: "payment.refunded",

  // Notification triggers
  NOTIFICATION_SEND: "notification.send",
  NOTIFICATION_SENT: "notification.sent",
  NOTIFICATION_FAILED: "notification.failed",
} as const;

// Queue names per service
export const Queues = {
  // Auth service queues
  AUTH_EVENTS: "auth.events",

  // Notifications service queues
  NOTIFICATIONS_USER_EVENTS: "notifications.user-events",
  NOTIFICATIONS_ORDER_EVENTS: "notifications.order-events",
  NOTIFICATIONS_PAYMENT_EVENTS: "notifications.payment-events",

  // Orders service queues
  ORDERS_PAYMENT_EVENTS: "orders.payment-events",

  // Payment service queues
  PAYMENT_ORDER_EVENTS: "payment.order-events",
} as const;
