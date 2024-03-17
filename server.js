const path= require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, eliminateUser} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folders
app.use(express.static(path.join(__dirname, 'public')));

const botName = "chatCordBot";

//run when client connects
io.on('connection', socket => {
    //initializing the room
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        //Welcome Current user
        socket.emit('message', formatMessage(botName, "Welcome to ChatCord!"));

        //Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));
    })

    //listen to messgaes
    socket.on('chatMessage', (message) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(`${user.username}`, message));
    })

    //Broadcast when a user disconnects
    socket.on('disconnect', () => {
        const removedUser = eliminateUser(socket.id);

        io.to(removedUser.room).emit('message', formatMessage(botName, `${removedUser.username} has left the chat`));
    })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Now Server is running on port ${PORT}`));