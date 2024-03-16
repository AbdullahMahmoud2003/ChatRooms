import path from 'path';
import http from 'http';
import express from 'express';
import socketio  from 'socket.io';
import { formatMessage } from './utils/messages.js';
const path= require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folders
app.use(express.static(path.join(__dirname, 'public')));

const botName = "chatCordBot";

//run when client connects
io.on('connection', socket => {
    //Welcome Current user
    socket.emit('message', formatMessage(botName, "Welcome to ChatCord!"));

    //Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, "A user has joined the chat"));

    //Broadcast when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, "A user has left the chat"));
    })

    //listen to messgaes
    socket.on('chatMessage', (message) => {
        io.emit('message', formatMessage('USER', message))
    })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Now Server is running on port ${PORT}`));