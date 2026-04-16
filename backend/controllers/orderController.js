const orderService = require("../services/orderService.js");
const driverService = require("../services/driverService.js");

class OrderController {
  /**
   * @openapi
   * /orders:
   *   get:
   *     summary: Get all orders
   *     tags:
   *       - Orders
   *     responses:
   *       200:
   *         description: Orders list
   */
  async getOrders(req, res) {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  }

  /**
   * @openapi
   * /orders:
   *   post:
   *     summary: Create an order
   *     tags:
   *       - Orders
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               store:
   *                 type: string
   *               customerName:
   *                 type: string
   *               phone:
   *                 type: string
   *               address:
   *                 type: string
   *               time:
   *                 type: string
   *               status:
   *                 type: string
   *               notes:
   *                 type: string
   *               price:
   *                 type: number
   *               driverId:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Order created
   */
  async createOrder(req, res) {
  const {
    store,
    customerName,
    phone,
    address,
    time,
    status,
    notes,
    price,
    driverId,
  } = req.body;

  if (!store || !customerName || !phone || !address || !time || !status || !driverId) {
    return res.json({ error: "Missing data" });
  }

  const allowedStatuses = ["pending", "on_the_way", "delivered"];

  if (!allowedStatuses.includes(status)) {
    return res.json({ error: "Invalid status" });
  }

  if (phone.length < 9) {
    return res.json({ error: "Invalid phone number" });
  }

  if (isNaN(price)) {
    return res.json({ error: "Price must be a number" });
  }

const driver = await driverService.findById(Number(driverId));

if (!driver) {
  return res.json({ error: "Driver not found" });
}


  const newOrder = {
    store,
    customerName,
    phone,
    address,
    time,
    status,
    notes: notes || "",
    price: Number(price) || 0,
    driverId: Number(driverId),
  };

  const order = await orderService.addOrder(newOrder);
  res.json(order);
}

  /**
   * @openapi
   * /orders/{id}/status:
   *   put:
   *     summary: Update order status
   *     tags:
   *       - Orders
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: string
   *                 example: delivered
   *     responses:
   *       200:
   *         description: Order status updated
   */
  async updateOrderStatus(req, res) {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (!status) {
    return res.json({ error: "Status is required" });
  }

  const allowedStatuses = ["pending", "on the way", "delivered"];

  if (!allowedStatuses.includes(status)) {
    return res.json({ error: "Invalid status" });
  }

  const updatedOrder = await orderService.updateOrderStatus(id, status);

  if (!updatedOrder) {
    return res.json({ error: "Order not found" });
  }

  res.json(updatedOrder);
}

  /**
   * @openapi
   * /orders/{id}:
   *   delete:
   *     summary: Delete an order
   *     tags:
   *       - Orders
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Order deleted
   */
  async deleteOrder(req, res) {
    const id = Number(req.params.id);

    const order = await orderService.deleteOrder(id);

    if (!order) {
      return res.json({ error: "Not found" });
    }

    res.json(order);
  }
}

module.exports = new OrderController();