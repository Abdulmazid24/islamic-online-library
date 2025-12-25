import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Islamic Online Library API',
            version: '1.0.0',
            description: 'Enterprise-grade MERN stack API documentation for the Islamic Online Library project.',
            contact: {
                name: 'Abdul Mazid',
                url: 'https://abdulmazid-portfolio.vercel.app/',
                email: 'mazid.developer@gmail.com',
            },
        },
        servers: [
            {
                url: process.env.BACKEND_URL || 'http://localhost:5000',
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
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
export default specs;
