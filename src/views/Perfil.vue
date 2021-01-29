<template>
    <div>
        <div class="uk-container">
            <div class="uk-card uk-card-default uk-padding uk-position-center">
                <div v-if="erro" class="uk-alert-danger" uk-alert>
                    <p>{{ msgErro }}</p>
                </div>
                <div class="uk-margin">
                    <h1>Perfis</h1>
                </div>
                <h3 v-for="Perfil in Perfils" :key="Perfil.id"><a @click="perfil(Perfil._id)">{{ Perfil.nome }}</a></h3>

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
        User.listarPerfil().then(resposta=>{
            console.log(resposta)
            if(resposta.erro){
                return this.$router.push({ name: 'Login' })
            }
            this.Perfils = resposta.data
        })
    },
    methods:{
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
                console.log(resposta)
                if (resposta.data.erro) {
                    this.erro = !this.erro
                    return this.msgErro = resposta.data.erro
                }
                
            })
        }
    }
}
</script>