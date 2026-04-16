const prisma = require("../lib/prisma.js");

class OrderService {
  async getAllOrders() {
    return await prisma.order.findMany({
      include: {
        driver: true,
      },
    });
  }

  async addOrder(order) {
    return await prisma.order.create({
      data: order,
      include: {
        driver: true,
      },
    });
  }

  async updateOrderStatus(id, status) {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) return null;

    return await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        driver: true,
      },
    });
  }

  async deleteOrder(id) {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) return null;

    return await prisma.order.delete({
      where: { id },
    });
  }
}

module.exports = new OrderService();