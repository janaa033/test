const prisma = require("../lib/prisma.js");

class DriverService {
  async getAllDrivers() {
    return await prisma.driver.findMany();
  }

  async addDriver(driver) {
    return await prisma.driver.create({
      data: driver,
    });
  }

  async findByPhone(phone) {
    return await prisma.driver.findUnique({
      where: { phone },
    });
  }

  async deleteDriver(phone) {
    const driver = await prisma.driver.findUnique({
      where: { phone },
    });

    if (!driver) return null;

    return await prisma.driver.delete({
      where: { phone },
    });
  }
}

module.exports = new DriverService();
