let express = require('express');
let socket = require('socket.io');

// setup application.
let app = express();

// setup server.
let server = app.listen(8080, "0.0.0.0");

//setup static files middleware.
app.use(express.static('public'));

// socket setup.
let io = socket(server);

// listen to connection.
io.on('connection', // when connections is established, callback is fired
    (socket) => {
        console.log('made socket connection', socket.id);
        socket.on('chat', (data) => {
            // io.sockets.emit('chat', data);
            io.sockets.emit('chat', data);
        });

        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', data);
        })
    });