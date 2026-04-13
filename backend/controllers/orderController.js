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
  getOrders(req, res) {
    res.json(orderService.getAllOrders());
  }

  /**
   * @openapi
   * /orders:
   *   post:
   *     summary: Create an order
   *     tags:
   *       - Orders
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id:
   *                 type: integer
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
  createOrder(req, res) {
    const {
      id,
      store,
      customerName,
      phone,
      address,
      time,
      status,
      notes,
      price
    } = req.body;

    if (!id || !store || !customerName || !phone || !address || !time || !status) {
      return res.json({ error: "Missing data" });
    }

    const newOrder = {
      id,
      store,
      customerName,
      phone,
      address,
      time,
      status,
      notes: notes || "",
      price: price || 0
    };

    res.json(orderService.addOrder(newOrder));
  }

  /**
   * @openapi
   * /orders/{id}:
   *   delete:
   *     summary: Delete an order
   *     tags:
   *       - Orders
   *     security:
   *       - bearerAuth: []
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
  deleteOrder(req, res) {
    const order = orderService.deleteOrder(Number(req.params.id));

    if (!order) {
      return res.json({ error: "Not found" });
    }

    res.json(order);
  }
}

module.exports = new OrderController();