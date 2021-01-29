<template>
    <div>
        <div class="uk-container">
            <div class="uk-card uk-card-default uk-padding uk-position-center">
                <p class="uk-h2 uk-text-bold" style="color: green;">Desafio Jera</p>
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
import User from '../services/index'
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
        cadastrar(){
            User.cadastrar(this.email, this.senha, this.nome, this.nascimento).then(resposta=>{
                console.log(resposta)
                if(resposta.data.erro){
                    this.erro = true 
                    return this.msgErro = resposta.data.erro
                }
                this.$router.push({ name: 'Login' })
            })
        }
    }
}
</script>