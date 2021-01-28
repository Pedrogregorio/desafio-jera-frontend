<template>
    <div>
        {{ msgErro }}
        <form @submit.prevent="cadastrar">
            <input v-model="email" type="email">
            <input v-model="senha" type="password">
            <input v-model="nome" type="text">
            <input v-model="nascimento" type="date">
            <button type="submit">Cadastrar</button>
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
                this.$router.push({ name: 'Login' })
            } catch (error) {
                this.msgErro = 'Cadastro nao efetuado'
            }
            
        }
    }
}
</script>