<template>
    <div>
        <div class="field padding-bottom--24">
            <label for="matricule">Matricule : </label>
            <input type="text" id="matricule" name="matricule" v-model="matricule"><br><br>
        </div>

        <div class="field padding-bottom--24">
            <label for="fname">First name : </label>
            <input type="text" id="fname" name="fname" v-model="firstname"><br><br>
        </div>

        <div class="field padding-bottom--24">
            <label for="lname">Last name : </label>
            <input type="text" id="lname" name="lname" v-model="secondname"><br><br>
        </div>

        <div class="field padding-bottom--24">
            <label for="password">password : </label>
            <input type="password" id="password" name="password" v-model="password"><br><br>
        </div>
        <a href="#" @click.prevent="submit" class="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
        </a>

        <p v-if="showError" id="error">Username or Password is incorrect</p>
    </div>

</template>

<script>
import {mapActions} from 'vuex'
export default {
    name : 'SignUp',

    data(){
        return{
            matricule : null,
            firstname : null,
            secondname : null,
            password : null,
            showError : null
        }
    },

    methods : {
        ...mapActions(["SignUp"]),

        async submit(){
            try{
                
                await this.SignUp({
                    'matricule': this.matricule,
                    "firstName" : this.firstname,
                    "secondName": this.secondname,
                    "password" : this.password
                })

                this.$router.push("/meet")
                this.showError = false
            }catch{
                this.showError = true
            }
        }
    }
}
</script>

<style>

</style>