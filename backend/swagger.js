const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Delivery API",
      version: "1.0.0"
    },
    servers: [
      { url: "http://localhost:5000" }
    ],
      components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./controllers/*.js"]
};

module.exports = swaggerJSDoc(options);