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
        console.log(tasks);
    });


    socket.on('removeTask', id => {
        for (let outTask of tasks) {
            if (outTask.id === id) {
                console.log(outTask.id);
                console.log('jestem w petli');

                tasks.splice(tasks.indexOf(outTask), 1);

                socket.broadcast.emit('removeTask', id)
            }
        }
    });
});