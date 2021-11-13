const socket = io()

let name;
let textarea = document.querySelector('#textarea')
// Here .message__area is used to class name 
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please Enter your name:')

} while (!name)

// Firing event when any key press
textarea.addEventListener('keyup', (e) => {
    // If entered key name is Enter then value passes to sendMessage Function
    if (e.key == 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        //Here trim() is used to remove the newline that is automatically adds
        message: message.trim()
    }

    //Append the message and its type outgoing
    appendMessage(msg, 'outgoing')
    //To clear the message field after sending messageArea
    textarea.value = ''
    scrollBottom()

    socket.emit('message', msg)
}

//Function to append message and its type(incoming,outgoing) to html page
function appendMessage(msg, type) {
    //Creating a DIV
    let mainDiv = document.createElement('div')
    let className = type
    //Adding class to mainDiv
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p> 

    `
    //Inserting the markup in mainDiv
    mainDiv.innerHTML = markup

    //to append the messageArea
    messageArea.appendChild(mainDiv)
}

//Receive message
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollBottom()
})

//For automatic scroll to the bottom message after incoming and outgoing message
function scrollBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}