import { prisma } from "../config/database";
import { Prisma, OrderStatus } from "@prisma/client";
import { AppError } from "../middleware/error-handler";

interface CreateOrderInput {
  userId: string;
  items: Array<{
    serviceId: string;
    quantity: number;
  }>;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  scheduledDate?: Date;
  notes?: string;
}

interface GetOrdersOptions {
  page: number;
  limit: number;
  status?: string;
}

export class OrderService {
  async createOrder(input: CreateOrderInput) {
    // Fetch service details for each item
    const serviceIds = input.items.map((item) => item.serviceId);
    const services = await prisma.service.findMany({
      where: {
        id: { in: serviceIds },
        isActive: true,
      },
    });

    if (services.length !== serviceIds.length) {
      throw new AppError(400, "One or more services not found", "INVALID_SERVICE");
    }

    // Calculate totals
    const orderItems = input.items.map((item) => {
      const service = services.find((s) => s.id === item.serviceId)!;
      const totalPrice = service.basePrice.mul(item.quantity);

      return {
        serviceId: service.id,
        serviceName: service.name,
        quantity: item.quantity,
        unitPrice: service.basePrice,
        totalPrice,
      };
    });

    const totalAmount = orderItems.reduce(
      (sum, item) => sum.add(item.totalPrice),
      new Prisma.Decimal(0)
    );

    // Create order with items and address
    const order = await prisma.order.create({
      data: {
        userId: input.userId,
        totalAmount,
        scheduledDate: input.scheduledDate,
        notes: input.notes,
        items: {
          create: orderItems,
        },
        address: {
          create: input.address,
        },
      },
      include: {
        items: true,
        address: true,
      },
    });

    return order;
  }

  async getOrderById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        address: true,
      },
    });
  }

  async getUserOrders(userId: string, options: GetOrdersOptions) {
    const skip = (options.page - 1) * options.limit;

    const where: Prisma.OrderWhereInput = {
      userId,
      ...(options.status && { status: options.status as OrderStatus }),
    };

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: true,
          address: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: options.limit,
      }),
      prisma.order.count({ where }),
    ]);

    return { orders, total };
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    const order = await prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new AppError(404, "Order not found", "NOT_FOUND");
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status,
        ...(status === "COMPLETED" && { completedDate: new Date() }),
      },
      include: {
        items: true,
        address: true,
      },
    });

    return updatedOrder;
  }
}
