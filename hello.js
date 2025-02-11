const express = require("express");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Dokumentacioni',
        version: '1.0.0',
        description: 'Dokumentacioni për API-të',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./app.js'], // Path to the API docs in your code
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Merr të gjithë përdoruesit
 *     responses:
 *       200:
 *         description: Lista e përdoruesve
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 * 
 */

//Geti per user
app.get('/api-docs', (req, res) => {
    res.send([{id:1, name:"John Doe"}]);
});



/**
 * @swagger
 * /users:
 *   post:
 *     summary: Shto një përdorues të ri
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Përdoruesi u shtua
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */
//Post per user
app.post('/users', (req, res) => {
    const{name} = req.body;
    res.status(201).send({id:1, name});
});




//Update per user
app.put('/users/:id', (req, res) => {
    const{id} = req.params;
    const{name} = req.body;
    res.status(200).send({id, name});
});

//Delete per user
app.delete('/users/:id', (req, res) => {
    const{id} = req.params;
    res.send({message:`User me ${id} me u fshi`});
});

const PORT = 3000;
app.listen(PORT, () => {  
    console.log(`server is running on port ${PORT}/api-docs`);
});