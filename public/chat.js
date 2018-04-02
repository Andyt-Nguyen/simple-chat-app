// Make socket.io connection
const socket = io.connect('http://localhost:3000');

// Query DOM
function getDomId(element) {
	return document.getElementById(element);
}

const message = getDomId('message');
const handle  = getDomId('handle');
const btn     = getDomId('send');
const output  = getDomId('output');
const feedback  = getDomId('feedback');

// Emmit Events
btn.addEventListener('click', () => {
	socket.emit('chat',{
		message: message.value,
		handle: handle.value
	});

	message.value = '';
	handle.value = '';
});

message.addEventListener('keypress', () => {
	socket.emit('typing', handle.value)
});

// Listen for events from the server
socket.on('chat', data => {
	feedback.innerHTML = '';
	output.innerHTML += `
		<p>
			<strong>${data.handle}: </strong>${data.message}
		</p>
		`
});

// Listen for broadcast from the server
socket.on('typing', userName => {
	feedback.innerHTML = `
		<p><em>${userName} is typing a message...</em></p>
	`;
})
