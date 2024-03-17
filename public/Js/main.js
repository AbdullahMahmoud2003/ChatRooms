const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

// get username and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io();

//join room
socket.emit("joinRoom", {username, room})

socket.on('addUserNames', users => {
    showAllUsers(users);
})

//message from server
socket.on('message', message=>{
    console.log(message);
    outputMessage(message);
    
    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    //emit message to the server
    socket.emit('chatMessage', msg);

        //clear input
    e.target.elements.msg.value = '';
})

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message['username']} <span>${message['time']}</span></p>
    <p class="text">
    ${message['text']}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
}

function showAllUsers(users) {
    for (var i = 0; i < users.length; i++){
        const li = document.createElement('li');
        li.classList.add('user');
        li.innerHTML = `<li>${users[i].username}</li>`;
        document.getElementById('users').appendChild(li);
    }
}

