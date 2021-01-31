<template>
    <div>
        <nav class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-right">
                <ul class="uk-navbar-nav">
                    <li class="uk-active"><a @click="logout()">Sair</a></li>
                </ul>
            </div>
        </nav>   
        <div class="uk-container">
            <div class="uk-card uk-card-default uk-padding uk-position-center">
                <div v-if="erro" class="uk-alert-danger" uk-alert>
                    <p>{{ msgErro }}</p>
                </div>
                <div class="uk-margin">
                    <h1>Perfis</h1>
                </div>
                <h3 v-for="Perfil in Perfils" :key="Perfil.id"><a @click="perfil(Perfil._id)">{{ Perfil.nome }}</a> <button @click="deletePerfil(Perfil._id)"> X </button></h3>

                <div class="uk-margin">
                    <a class="uk-h4" @click="show()"> + Criar Perfil </a>
                </div>

                <div class="uk-margin" v-if="Add">
                    <form @submit.prevent="adicionaPerfil">
                        <input v-model="nome" type="text">
                        <button>Cadastrar</button>
                    </form>
                </div>
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
            Perfils: [],
            nome: '',
            Add: false
        }
    },
    async created(){
        this.listar()
    },
    methods:{
        listar(){
            User.listarPerfil().then(resposta=>{
                if(resposta.erro){
                    return this.$router.push({ name: 'Login' })
                }
                this.Perfils = resposta.data
            })
        },
        async logout(){
            try {
                const resposta = await localStorage.removeItem('token')
                this.$router.push({ name: 'Login' })
            } catch (error) {
                
                return {status: 'Erro'}
            }
                
        },
        show(){
            this.Add = !this.Add
        },
        async perfil(id){
            User.setPerfil(id).then(resposta=>{
                this.$router.push({name:'Page'})
            })
        },
        async adicionaPerfil(){
            User.adicionaPerfil(this.nome).then(resposta=>{
                if (resposta.data.erro) {
                    this.erro = !this.erro
                    return this.msgErro = resposta.data.erro
                }
                this.nome = ''
                this.listar()
            })
        },
        deletePerfil(id){
            User.deletePerfil(id).then(resposta=>{
                this.listar()
            }).catch(e=>{
                console.log(e)
            })
        }
    }
}
</script>