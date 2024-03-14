const path= require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folders
app.use(express.static(path.join(__dirname, 'public')));

//run when client connects
io.on('connection', socket=>{
    //Welcome Current user
    socket.emit('message', "Welcome to ChatCord!");

    //Broadcast when a user connects
    socket.broadcast.emit('message', "A user has joined the chat");

    //Broadcast when a user disconnects
    socket.on('disconnect', ()=>{
        io.emit('message', "A user has left the chat");
    })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Now Server is running on port ${PORT}`));