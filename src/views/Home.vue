<template>
  <div>
    <form @submit.prevent="autenticacao">
      <input type="text" v-model="email">
      <input type="password" v-model="senha">
      <button type="submit">Entrar</button>
    </form>
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
      senha: ''
    }
  },
  methods:{
    async autenticacao(){
      const resposta = await http.post('cadastro/autenticacao', {
        email: this.email,
        senha: this.senha
      })
      const token = resposta.data.token
      localStorage.setItem('token', token)
      console.log(resposta)
    }
  }
}
</script>
