const driverService = require("../services/driverService.js");
const jwt = require("jsonwebtoken");

class DriverController {
  /**
   * @openapi
   * /drivers:
   *   get:
   *     summary: Get all drivers
   *     tags:
   *       - Drivers
   *     responses:
   *       200:
   *         description: Drivers list
   */
  async getDrivers(req, res) {
    const drivers = await driverService.getAllDrivers();
    res.json(drivers);
  }

  /**
   * @openapi
   * /drivers:
   *   post:
   *     summary: Create a driver
   *     tags:
   *       - Drivers
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               phone:
   *                 type: string
   *               password:
   *                 type: string
   *               type:
   *                 type: string
   *               company:
   *                 type: string
   *     responses:
   *       200:
   *         description: Driver created
   */
  async createDriver(req, res) {
    const { name, phone, password, type, company } = req.body;

    if (!name || !phone || !password || !type || !company) {
      return res.json({ error: "Missing data" });
    }

    const existing = await driverService.findByPhone(phone);

    if (existing) {
      return res.json({ error: "Driver already exists" });
    }

    const newDriver = {
      name,
      phone,
      password,
      type,
      company,
    };

    const driver = await driverService.addDriver(newDriver);
    res.json(driver);
  }

  /**
   * @openapi
   * /drivers/login:
   *   post:
   *     summary: Driver login
   *     tags:
   *       - Drivers
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               phone:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful
   */
  async login(req, res) {
    const { phone, password } = req.body;

    const driver = await driverService.findByPhone(phone);

    if (!driver) {
      return res.json({ error: "Invalid credentials" });
    }

    if (password !== driver.password) {
      return res.json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { phone: driver.phone, type: driver.type },
      "secret123",
      { expiresIn: "1h" }
    );

    res.json({ token });
  }

  /**
   * @openapi
   * /drivers/{phone}:
   *   delete:
   *     summary: Delete a driver
   *     tags:
   *       - Drivers
   *     parameters:
   *       - in: path
   *         name: phone
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Driver deleted
   */
  async deleteDriver(req, res) {
    const driver = await driverService.deleteDriver(req.params.phone);

    if (!driver) {
      return res.json({ error: "Not found" });
    }

    res.json(driver);
  }
}

module.exports = new DriverController();