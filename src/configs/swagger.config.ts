const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options: any = {
  definition: {
    openapi: '3.0.0',
    info: {
      description: 'Employee Management System is Powerful app that manages all official operations',
      version: '1.0.0',
      title: 'EMS PASSPORT APP',
      termsOfService: 'http://swagger.io/terms/',
      contact: {
        email: 'codecanvus@gmail.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [ // Define your tags here
      {
        name: 'Auth',
        description: 'Endpoints related to authentication',
      },
      {
        name: 'User',
        description: 'Endpoints related to user management',
      },
      {
        name: 'Role',
        description: 'Endpoints related to roles and permissions',
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: any) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req: Request, res: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
