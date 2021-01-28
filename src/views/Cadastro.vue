<template>
    <div>
        <div class="uk-container">
            <div class="uk-card uk-card-default uk-padding uk-position-center">
                <div v-if="erro" class="uk-alert-danger" uk-alert>
                    <p>{{ msgErro }}</p>
                </div>
                <form @submit.prevent="cadastrar">
                    <div class="uk-margin">
                        <input class="uk-input" v-model="email" type="email">
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input" v-model="senha" type="password">
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input" v-model="nome" type="text">
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input" v-model="nascimento" type="date">
                    </div>
                    <button class="uk-button uk-button-primary" type="submit">Cadastrar</button>
                </form>
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
            erro: false,
            msgErro: '',
            email: '',
            senha: '',
            nome: '',
            nascimento: ''
        }
    },
    methods:{
        async cadastrar(){
            try {
                const resposta = await http.post('cadastro/registro', {
                    email: this.email,
                    senha: this.senha,
                    nome: this.nome,
                    nascimento: this.nascimento,
                })
                if(resposta.data.erro){
                    this.erro = true 
                    return this.msgErro = resposta.data.erro
                }
                this.$router.push({ name: 'Login' })
            } catch (error) {
                this.msgErro = 'Cadastro nao efetuado'
            }
            
        }
    }
}
</script>