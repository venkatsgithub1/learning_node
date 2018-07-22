// establish connection to the server.
let socket = io.connect('http://localhost:8080');

// query d o m
let output = document.getElementById('output');
let handle = document.getElementById('handle');
let messageToSend = document.getElementById('message');
let sendBtn = document.getElementById('send');
let feedback = document.getElementById('feedback');

// emit event when send button is pressed.
sendBtn.addEventListener('click', () => {
    socket.emit('chat', {
        message: messageToSend.value,
        handle: handle.value
    });
    // output.innerHTML += "<p><strong>" + handle.value + ':</strong>' + messageToSend.value + '</p>';
    messageToSend.value = "";
});

messageToSend.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

// Listen for server event.
socket.on('chat', (data) => {
    feedback.innerHTML="";
    output.innerHTML += "<p><strong>" + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = "<p><em>"+data+" is typing a message...</em></p>";
});