const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options: any = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
    //   version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["../routes/*.*.ts", "../routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: any) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: any) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

//   log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;