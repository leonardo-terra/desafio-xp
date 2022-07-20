const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'desafio-XP',
      description: 'API rest para desafio XP',
      version: '1.0',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'servidor local',
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
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerConfig;
