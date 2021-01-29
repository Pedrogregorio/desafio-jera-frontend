<template>  
  <div>
    <div class="uk-container">
      <div class="uk-card uk-card-default uk-padding uk-position-center">
        <p class="uk-h2 uk-text-bold" style="color: green;">Desafio Jera</p>
          <div v-if="erro" class="uk-alert-danger" uk-alert>
            <p>{{ msgErro }}</p>
          </div>
          <form @submit.prevent="autenticacao">
            <div class="uk-margin">
              <input class="uk-input" placeholder="Email" type="email" v-model="email">
            </div>
            <div class="uk-margin">
              <input class="uk-input" type="password" placeholder="Senha" v-model="senha">
            </div> 
            <div class="uk-margin">
              <button class="uk-button uk-button-primary" type="submit">Entrar</button>
            
            </div>
            <a href="/cadastro">Cadastrar</a>
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
      email: '',
      senha: '',
      erro: false,
      msgErro: ''
    }
  },
  methods:{
    autenticacao(){
      User.autenticacao(this.email, this.senha).then(res=>{
        console.log(res)
        if(res.data.erro){
          this.erro = true 
          return this.msgErro = res.data.erro
        }
        if(res.erro){
          return this.msgErro = 'Email Ou Senha Invalidos'
        }
        this.$router.push({ name: 'Perfil' }) 
      })
    }
   
  }
}
</script>
