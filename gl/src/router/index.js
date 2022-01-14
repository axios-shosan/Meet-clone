import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js';
import Meet from '../views/Meet.vue'
import MeetRoom from '../components/MeetRoom.vue'
import Files from '../views/Files'
import Chat from '../views/Chat'
import Home from '../views/Home'
import registration from '../views/Registration'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { guest : true },
  },
  {
    path: '/meet',
    name: 'Meet',
    component: Meet,
    meta: { requiresAuth: true },
  },
  {
    path: '/join/:id',
    name: 'MeetRoom',
    component: MeetRoom,
    meta: { guest: true },
  },
  {    
    path: '/files',
    name: 'Files',
    component: Files,
    meta: { requiresAuth: true },
  },
  {    
    path: '/chatroom',
    name: 'Chat',
    component: Chat,
    meta: { requiresAuth: true },
  },
  {    
    path: '/registration',
    name: 'registration',
    component: registration,
    meta: { guest: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.isAuthenticated){
      next({
        path: '/registration',
        quety : {redirecit: to.fullPath}
      })
    }
    else
      next()
  } else
      next()
})



export default router
