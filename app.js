const express = require('express');
const port = process.env.PORT || 3000;
const socket = require('socket.io');
const app = express();

// Static files
app.use(express.static('public'))

const server = app.listen(port, () => console.log(`The server is running on port ${port}...`));


// Socket setup
let io = socket(server);
io.on('connection', socket => {
	console.log('Made socket connection',socket.id);

	// Listens for the message from the client
	socket.on('chat', data => {
		// the data is being emitted to all sockets(clients)
		io.sockets.emit('chat', data)
	})

	// Listens for the clients username
	socket.on('typing', userName => {
		socket.broadcast.emit('typing', userName);
	});

});
