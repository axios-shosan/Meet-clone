<template>
  <div class="meet">
    <div>
      <div id="room-container"></div>
      <button v-if="!share" @click="shareScreen"><span class="material-icons">screen_share</span></button>
      <button v-if="share" @click="stopScreenShare"><span class="material-icons">stop_screen_share</span></button>
      <button  @click="handleDisconnect"><span class="material-icons">call_end</span></button>
      <button @click="change_voice"><span class="material-icons">mic</span></button>
      <button @click="chenge_video"><span class="material-icons">videocam</span></button>
      <button @click="showMessages= !showMessages"><span class="material-icons">chat</span></button>
    </div>
    <div class="chat">
      <Chat :chatLink="this.$router.currentRoute.params" v-show="showMessages"/>
    </div>
  </div>
</template>

<script>
import { createSocketConnectionInstance } from "../connection/connection.js";
import Chat from "../views/Chat.vue"
export default {
  name: "MeetRoom",

  components : {
    Chat,
  },

  data() {
    return {
      socketInstance: null,
      video: true,
      voice: true,
      share : false,
      showMessages : true,
    };
  },



  methods: {
    handleDisconnect: function () {
      if (this.socketInstance) this.socketInstance.destoryConnection();
      console.log("you wanna get out ?");
      this.$router.push("/");
    },
    chenge_video: function () {
console.log("streaming : ", this.socketInstance.streaming);
console.log("Tracks : ",  this.socketInstance.streaming.getTracks());
      if (this.video === true) {
        
        this.socketInstance.streaming.getTracks()[1].enabled = false
        console.log("disabling camera");
      } else
        this.socketInstance.streaming.getTracks()[1].enabled = true
      this.video = !this.video;
      console.log(this.video);
    },

    change_voice: function () {
        console.log(this.socketInstance.streaming.getTracks());
        if (this.voice === true) {
            this.socketInstance.streaming.getTracks()[0].enabled = false
        } else
            this.socketInstance.streaming.getTracks()[0].enabled = true
        console.log(this.voice);
        this.voice = !this.voice;
    },

    shareScreen: function() {
      if(!this.share){
        navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
          if(stream){
            this.socketInstance.createVideo({ id: this.socketInstance.myID, stream : stream });
            this.socketInstance.setPeersListeners(stream);
            this.socketInstance.newUserConnection(stream);
          }
        })
      this.share = !this.share  
      }
    },

    stopScreenShare : function () {
     if(this.share){
        this.socketInstance.getVideoAudioStream(true, true).then((stream) => {
            if (stream) {
                this.socketInstance.streaming = stream;
                this.socketInstance.createVideo({ id: this.myID, stream : stream });
                this.socketInstance.setPeersListeners(stream);
                this.socketInstance.newUserConnection(stream);
            }
        })
        .catch(err => console.error("error in setNavigatorToStream : " + err))
     }
    }
  },

  mounted() {
    this.socketInstance = createSocketConnectionInstance();
    console.log("router is : ", this.$router);
  },

};
</script>

<style>
.material-icons:hover{
  color : white;
  background-color: rgb(120, 20, 20);
}

.meet{
  display : flex;
  flex-direction: row; 
  justify-content: space-around;
}


</style>