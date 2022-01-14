<template>
<div class="cont">
  <router-link to="/files">
    <div class="container">
      <div class="content">
          <h3>Files</h3>
          <p>You can share your files, and you can download them as well</p>
      </div>
    </div>
  </router-link>
  <router-link to="/meet" >
    <div class="container">
      <div class="content">
        <h3>Meet</h3>
        <p>Create your own meet, or join a meet</p>
      </div>
    </div>
  </router-link> 
  <router-link to="/chatroom">
    <div class="container">
      <div class="content">
        <h3>Chat</h3>
        <p>Enter your section’s chat and see the latest updates</p>
      </div>
    </div>
  </router-link>
</div> 

</template>
<script>

import {mapGetters} from "vuex"

export default {
    name : 'home',

    computed : {
      ...mapGetters({ Student : "StateStudent"})
    },
}
</script>

<style scoped>

body {
  background: #E8F0F2;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

.cont{
  display: flex;
  flex-direction: row ;
  margin : auto;
  margin-top : 14%;
  justify-content: space-between;
}
.container {
    color : #1A374D;
    margin : 0 10px;
    position : relative;
}

.content {
  background: rgba(255,255,255,0.3);;
  padding: 3em;
  width : 18vw;
  height : 18vh;
  border-radius: 20px;
  border-left: 1px solid rgba(255,255,255,0.3);;
  border-top: 1px solid rgba(255,255,255,0.3);;
  backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0,0,0,0.2);
  text-align: center;
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
  position: relative;
}
  .drop-1 {
    height: 80px;
    width: 80px;
    top: -300px;
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

.container:hover {
border-radius: 20px;
box-shadow: 0 0 5px #03e9f4,
            0 0 10px #03e9f4,
            0 0 20px #03e9f4,
            0 0 30px #03e9f4;
}




</style>