require("dotenv/config");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

class OrderService {
  async getAllOrders() {
    return await prisma.order.findMany();
  }

  async addOrder(order) {
    return await prisma.order.create({
      data: order,
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