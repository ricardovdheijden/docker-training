const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

let todoItems = [
    { id: 1, name: 'Move todo-api to Docker container' },
    { id: 2, name: 'Secure this API :)' },
    { id: 3, name: 'Test' },
];

app.get('/api/todos', (req, res) => {
    res.status(200).json(todoItems);
});

app.post('/api/todos', (req, res) => {
    const todoItem = {
        id: todoItems.length + 1,
        name: req.body.name
    }
    todoItems.push(todoItem)

    res.status(200).json(todoItem);
});

app.delete('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoItem = todoItems.find(c => c.id === todoId);
    if (!todoItem) {
        return res.status(404)
    }

    todoItems = todoItems.filter(todoItem => todoItem.id !== todoId);

    res.status(200).json(todoItem);
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}`))
