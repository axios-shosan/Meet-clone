const app = require("express")();
var cors = require('cors');
const { NONAME } = require("dns");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
    }
  });

const mongoose = require("mongoose");
let users = [];
let messages = [];

mongoose.connect("mongodb://localhost:27017/gl_db");

const ChatSchema = mongoose.Schema({
	username: String,
	msg: String,
	student : {
        type : mongoose.Types.ObjectId,
        ref : "students"
    },
	meet : {
        type : mongoose.Types.ObjectId,
        ref : "meets",
		default : null,
    }
});

const ChatModel = mongoose.model("chat", ChatSchema);

app.use(cors())

app.get('/getAllMessages', (req,res)=>{
	ChatModel.find((err, result) => {
		if (err) throw err;
	
		messages = result;
	});
	res.json({
		messages : messages
	})
})

io.on("connection", socket => {
	socket.emit('loggedIn', {
		users: users.map(s => s.username),
		messages: messages
	});

	socket.on('newuser', username => {
		console.log(`${username} has arrived at the party.`);
		socket.username = username;
		
		users.push(socket);

		io.emit('userOnline', socket.username);
	});

	socket.on('msg', msg => {
		let message = new ChatModel({
			username: socket.username,
			msg: msg.msg,
			meet : msg.meet
			
		});

		message.save((err, result) => {
			if (err) throw err;

			messages.push(result);

			io.emit('msg', result);
		});
	});
	
	// Disconnect
	socket.on("disconnect", () => {
		console.log(`${socket.username} has left the party.`);
		io.emit("userLeft", socket.username);
		users.splice(users.indexOf(socket), 1);
	});
});



http.listen(process.env.PORT || 3001, () => {
	console.log("Listening on port %s", process.env.PORT || 3001);
});