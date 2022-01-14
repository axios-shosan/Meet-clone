require("dotenv").config()

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server,{
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
    }
  })
const { v4: uuidV4 } = require('uuid')
const cors = require("cors")
const PORT = process.env.PORT || 5000

 app.use(cors())
app.use(express.json())

 const Meet = require('./database/models/meet.model')
 require('./database/database.conf').connect()

app.post('/join', (req, res)=>{
    console.log("recieved a get request");
    console.log(req);
    const {module} = req.body
    const link = uuidV4()
    console.log(link);
    Meet.create({module, link}, function(err, meet){
        if(err){
            return res.json({
                error : err
            })
        }
        return res.json({
            link : link
        })
    })
})

io.on('connection', socket => {
    socket.on('join-room', (userData) => {
        const { roomID, userID } = userData;
        socket.join(roomID);
        console.log(roomID);
        socket.to(roomID).emit('new-user-connect', userData);
        socket.on('disconnect', () => {
            socket.to(roomID).emit('user-disconnected', userID);
        });
    });
});

server.listen(PORT, console.log("listening on port 5000"))