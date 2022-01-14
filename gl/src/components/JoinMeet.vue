<template>
  <div class="app">
    <div class="container">
      <div class="content">
        <h3>Meet</h3>
        <button class="join" @click="handleJoin()">Create New meet</button>
        <input class="link" type="text" id="fname" name="fname" v-model="meet_link" @keypress.enter="enterMeet">
      </div>
    </div>
    <div class="drops">
      <div class="drop drop-1"></div>
      <div class="drop drop-2"></div>
      <div class="drop drop-3"></div>
      <div class="drop drop-4"></div>
      <div class="drop drop-5"></div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { mapGetters } from 'vuex'

export default {
  name: "JoinMeet",

  data(){
    return{
      meet_link : "Enter a code of a meet"
    }
  },

  computed : {
    ...mapGetters({ Student : "StateStudent"})
  },

  methods: {
    handleJoin: function () {
      console.log(this.Student);
      Axios.post(`http://localhost:5000/join`, {module: this.module })
        .then((res) => {
          console.log(res);
          this.$router.push(`/join/${res.data.link}`);
        })
        .catch((err) =>{
          console.log(`error while requesting to join room using axios ${err}`)
        });
    },

    enterMeet(){
      if(this.meet_link != "Enter a code of a meet" && this.meet_link != "" )
        this.$router.push(`/join/${this.meet_link}`);
      
    }
  },
};
</script>

<style>

.join{
  font-size : 18px;
  padding: 8px 10px;
  margin : 4px auto;
  margin-bottom: 8px;
  border-radius: 10px;
  background-color: #1A374D;
  color : #B1D0E0;
  width : fit-content;
  border : none
}

.join:hover{

  border-radius: 10px;
  box-shadow: 0 0 10px #03e9f4,
              0 0 20px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
}

.link{
  background-color: #B1D0E0;
  color : #1A374D;
  padding : 10px;
  margin : 4px auto;
  border-radius: 10px;
  font-size: 18px;
  border : none;
}

.container {
  color : #1A374D;
  position: absolute;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
  border : none;
}

.content {
  display: flex;
  flex-direction: column;
  background: #6998AB;
  padding: 3em;
  width : 18vw;
  border-radius: 20px;
  border-left: 1px solid rgba(255,255,255,0.3);;
  border-top: 1px solid rgba(255,255,255,0.3);;
  backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0,0,0,0.2);
  text-align: center;
  position: relative;
  transition: all 0.2s ease-in-out;

}

.content:hover {
  margin: 4px;
}
p {
  font-weight: 500;
  opacity: 0.7;
  font-size: 1.4rem;
  margin-top: 0;
  margin-bottom: 60px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  text-shadow: 2px 2px 6px #00000040;
}

.drop {
  background: rgba(255,255,255,0.3);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border-left: 1px solid rgba(255,255,255,0.3);
  border-top: 1px solid rgba(255,255,255,0.3);
  box-shadow: 10px 10px 60px -8px rgba(0,0,0,0.2);
  transition: all 0.2s ease;
  position: absolute;
}
  .drop-1 {
    height: 80px;
    width: 80px;
    top: -20px;
    left: -40px;
    z-index: -1;
  }
  
  .drop-2 {
    height: 80px;
    width: 80px;
    bottom: -30px;
    right: -10px;
  }
  
  .drop-3 {
    height: 100px;
    width: 100px;
    bottom: 120px;
    right: -50px;
    z-index: -1;
  }
  
  .drop-4 {
    height: 120px;
    width: 120px;
    top: -60px;
    right: -60px;
  }
  
  .drop-5 {
    height: 60px;
    width: 60px;
    bottom: 170px;
    left: 90px;
    z-index: -1;
  }

</style>