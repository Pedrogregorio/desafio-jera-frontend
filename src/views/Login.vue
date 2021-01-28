<template>  
  <div>
    <div class="uk-container">
      <div class="uk-card uk-card-default uk-padding uk-position-center">
          <div v-if="erro" class="uk-alert-danger" uk-alert>
            <p>{{ msgErro }}</p>
          </div>
          <form @submit.prevent="autenticacao">
            <div class="uk-margin">
              <input class="uk-input" type="email" v-model="email">
            </div>
            <div class="uk-margin">
              <input class="uk-input" type="password" v-model="senha">
            </div> 
            <button class="uk-button uk-button-primary" type="submit">Entrar</button>
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
      email: '',
      senha: '',
      erro: false,
      msgErro: ''
    }
  },
  methods:{
    async autenticacao(){
      try {
        const resposta = await http.post('cadastro/autenticacao', {
          email: this.email,
          senha: this.senha
        })
        console.log(resposta)
        if(resposta.data.erro){
          this.erro = true 
          return this.msgErro = resposta.data.erro
        }
        const token = resposta.data.token
        
        this.msgErro = ''
        
        localStorage.setItem('token', token)

        this.$router.push({ name: 'Perfil' })

      } catch (error) {
        this.msgErro = 'Usuario ou Senha incorretos'
      }
      
    },
  }
}
</script>
