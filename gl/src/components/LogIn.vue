<template>
    <div>
        <div class="field padding-bottom--24">
            <label for="matricule">Matricule : </label>
            <input type="text" name="matricule" v-model="matricule">
        </div>
        <div class="field padding-bottom--24">
            <label for="password">password : </label>
            <input type="password"  name="password" v-model="password">
        </div>

            <a href="#" @click.prevent="submit" class="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
            </a>
    </div>



</template>

<script>
import {mapActions} from 'vuex'
export default {
    name : 'LogIn',

    data(){
        return{
            matricule : null,
            password : null,
            showError: false,
        }
    },

    methods : {
        ...mapActions(["LogIn"]),
        
        async submit(){
            try{
                
                await this.LogIn({
                        'matricule': this.matricule,
                        "password" : this.password
                })
                
                console.log("pushing to meet");
                this.$router.push("/")
                this.showError = false
            }catch{
                this.showError = true
            }
        }
    }
    
}
</script>

<style scoped>
 @import '../assets/LogIn.css';
</style>