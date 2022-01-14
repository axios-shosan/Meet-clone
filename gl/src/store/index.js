import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    Student : {
      id: null,
      firstName : null,
      secondName : null
    },

  },
  mutations: {
    setStudent(state, student){
      state.Student.id = student.id
      state.Student.firstName = student.firstName
      state.Student.secondName = student.secondName
      console.log("setting the student in state", state.Student);
    },
  },

  actions: {
    async SignUp({dispatch} ,student){
      try{
        const res = await axios.post('http://localhost:3002/students/signup', student)
        if(res.status===200){
          dispatch('LogIn', {
            'matricule': student.matricule,
            "password" : student.password
          })   
        }
        }catch(err){
          console.error("error in axios while trying to sign up !!!", err)
        }
    },

    async LogIn({commit}, student){
      try{
        const res = await axios.post('http://localhost:3002/students/login', student)
        if(res.status===200){
          console.log(res.data);
         await commit('setStudent', {
            'id' : res.data.id,
            'firstName' : res.data.firstname,
            'secondName' : res.data.secondname 
          })
          localStorage.setItem('student', JSON.stringify(res.data));
        }
        else if(res.status === 401)
            console.log('invalid password or username !!!');

        }catch(err){
          console.error("error in axios while trying to sign up !!!", err)
        }
      },

      async LogOut({commit}){
        localStorage.removeItem('student');
        await commit('setStudent', {
          'id' : null,
          'firstName' :null,
          'secondName' : null
        })
      }
  },
  getters: {
    isAuthenticated: (state) => {
      console.log(state);
      const student = JSON.parse(localStorage.getItem('student'));
      return !!student
    },    
    StateStudent: () => JSON.parse(localStorage.getItem('student')),
  }
})
