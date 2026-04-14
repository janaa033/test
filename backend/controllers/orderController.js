const orderService = require("../services/orderService.js");

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
    } = req.body;

    if (!store || !customerName || !phone || !address || !time || !status) {
      return res.json({ error: "Missing data" });
    }

    const newOrder = {
      store,
      customerName,
      phone,
      address,
      time,
      status,
      notes: notes || "",
      price: price || 0,
    };

    const order = await orderService.addOrder(newOrder);
    res.json(order);
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