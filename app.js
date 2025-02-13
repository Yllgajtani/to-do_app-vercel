const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var cors = require('cors);
const app = express();

app.use(cors())
app.use(express.json());

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
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./app.js'],
};

// Swagger Docs setup
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let todos = [];

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Merr te gjitha taskat
 *     responses:
 *       200:
 *         description: Lista per te gjitha taskat
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   text:
 *                     type: string
 *                   completed:
 *                     type: boolean
 */

// Get method
app.get('/todos', (req, res) => {
  res.json(todos);
});

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Poston taskat
 *     responses:
 *       201:
 *         description: Poston taskat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 text:
 *                   type: string
 *                 completed:
 *                   type: boolean
 */

// Post method
app.post('/todos', (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Bene update taskat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Me id te taskes e ban update
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 text:
 *                   type: string
 *                 completed:
 *                   type: boolean
 */

// Put method
app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  todos[todoIndex] = { ...todos[todoIndex], ...req.body };
  res.json({ message: 'Task updated successfully', task: todos[todoIndex] });
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Fshin taskat me ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Fshin taskat
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The task was deleted
 *       404:
 *         description: Task not found
 */

// Delete method
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  todos.splice(todoIndex, 1);
  res.json({ message: 'Task deleted successfully' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
