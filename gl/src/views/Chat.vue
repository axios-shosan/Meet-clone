<template>
	<div id="app">
		<div class="header">
			<p class="username">Username: {{ Student.firstname }}</p>
		</div>
		<ChatRoom v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
	</div>
</template>

<script>
import io from 'socket.io-client';
import ChatRoom from '../components/ChatRoom.vue';
import axios from 'axios'
import { mapGetters } from 'vuex';
export default {
	name: 'Chat',

	components: {
		ChatRoom
	},

	data: function () {
		return {
			socket: io("http://localhost:3001"),
			messages: [],
			users: []
		}
	},

	props : {
		chatLink : {
			type : String,
			default : null,
		}
	},

	computed : {
    ...mapGetters({ Student : "StateStudent"})
	},

	methods: {
		joinServer: function () {
			this.socket.on('loggedIn', data => {
				this.messages = data.messages;
				this.users = data.users;
				this.socket.emit('newuser', this.Student.firstname);
			});
			this.listen();
		},

		listen: function () {
			this.socket.on('userOnline', user => {
				if(this.users.includes(user) == true)
					this.users.push(user);
			});
			this.socket.on('userLeft', user => {
				this.users.splice(this.users.indexOf(user), 1);
			});
			this.socket.on('msg', message => {
				this.messages.push(message);
			});
		},

		sendMessage: function (message) {
			message = {
				msg : message,
				meet : this.chatLink
			}

			this.socket.emit('msg', message);

			
		},

		getAllMessages : function(){
			axios
				.get('http://localhost:3001/getAllMessages')
				.then(res=>{
					console.log(res);
					this.messages = res.data.messages
				})
				.catch(err=>console.error("error while getting all the messages by axios in Chat.vue", err))
		}
	},
	mounted: function () {
		
		this.joinServer();
		this.getAllMessages();
	}
}
</script>

<style>
body {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #2C3E50;
	margin: 0;
	padding: 0;
}
#app {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>