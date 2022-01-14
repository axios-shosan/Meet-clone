<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <p></p>
    <router-link to="/registration" v-show="auth===false">Log In</router-link>
    <router-link v-show="auth" to="/registration" @click="LogOut">Log Out</router-link>
  <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name : 'App',

    computed : {
        ...mapGetters({ auth : "isAuthenticated"}),
    },

    methods : {
        ...mapActions(['LogOut']),
    },


}
</script>



<style>
body {
  background-color: #E8F0F2 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
