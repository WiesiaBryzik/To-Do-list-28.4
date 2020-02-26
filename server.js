const express = require('express');
const app = express();
// const socket = require('socket.io');


app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
  })
  
  const server = app.listen(8000, () => {
    console.log('Server is running on Port:', 8000)
  });
//   const io = socket(server);