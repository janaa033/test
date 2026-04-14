const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const auth = require("./middleware/auth.js");

const app = express();
app.use(express.json());

const driverController = require("./controllers/driverController.js");
const orderController = require("./controllers/orderController.js");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.get("/drivers", (req, res) => {
  driverController.getDrivers(req, res);
});

app.post("/drivers", (req, res) => {
  driverController.createDriver(req, res);
});

app.delete("/drivers/:phone", (req, res) => {
  driverController.deleteDriver(req, res);
});

app.get("/orders", (req, res) => {
  orderController.getOrders(req, res);
});

app.listen(5000, () => {
  console.log("http://localhost:5000");
  console.log("http://localhost:5000/api-docs");
});