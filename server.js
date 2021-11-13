const { response } = require('express')
const express = require('express')

const app = express()

const http = require('http').createServer(app)

const PORT = process.env.port || 3000

http.listen(PORT, () =>{
    console.log(`Listening on Port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

//Setup

const io = require('socket.io')(http)

io.on('connection', (socket) =>{
    console.log("Connected")
    // 'message' is the event and msg is the data
    socket.on('message', (msg)=> {
        console.log(msg)
         //broadcast is used for send message to all the connected sockets except the sender 
    socket.broadcast.emit('message', msg)
    })
   
})
