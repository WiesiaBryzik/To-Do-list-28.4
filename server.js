const express = require('express');
const app = express();
const socket = require('socket.io');

const tasks = [];

app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
})

const server = app.listen(8000, () => {
    console.log('Server is running on Port:', 8000)
});
const io = socket(server);



io.on('connection', socket => {
    socket.emit('updateData', tasks);


    socket.on('addTask', newTask => {
        tasks.push(newTask);
        socket.broadcast.emit('addTask', newTask)
    });

    socket.on('removeTask', () => {
        for (let outTask of tasks) {
            if (outTask.task === socket.task) {

                tasks.splice(tasks.indexOf(outTask), 1);

                socket.broadcast.emit('removeTask', tasks)
            }
        }
    });
});