<template>
    <div>
        <div class="uk-container">
            
            <div class="uk-card uk-card-default uk-padding uk-position-center">
                <div class="uk-margin">
                    <h1>Perfis</h1>
                </div>
                <h3><a href="/page">{{ Perfils }}</a></h3>
            </div>
        </div>
    </div>    
</template>
<script>
import axios from 'axios'
const http = axios.create({
	baseURL: 'http://localhost:3000/'
})
export default {
    data(){
        return{
            Perfils: '',
            id: 1
        }
    },
    async created(){
        try {
         
            const resposta = await http.get('page/perfil', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            console.log(resposta)
            this.Perfils = resposta.data.nome
   
        } catch (error) {
            console.log(error)            
        }
    }
}
</script>