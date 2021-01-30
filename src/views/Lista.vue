<template>
    <div> 
        <nav class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-left">
                <ul class="uk-navbar-nav">
                    <li class="uk-active"><a href="/page">Filmes</a></li>
                </ul>
            </div>
            <div class="uk-navbar-right">
                <ul class="uk-navbar-nav">
                    <li class="uk-active"><a href="/perfil">Perfil</a></li>
                    <li class="uk-active"><a @click="logout()">Sair</a></li>
                </ul>
            </div>
        </nav>    
        <div class="uk-container">
            <div class="uk-aling-center">
                <h1>Minha Lista</h1> 
            </div>     
            <hr>
            <div class="uk-grid-column-small uk-grid-row-large uk-child-width-1-3@s uk-text-center" uk-grid>
                <div class="uk-text-center" v-for="filmeLista in filmesLista" :key="filmeLista.id">
                    <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
                        <div v-if="!filmeLista.assistido" class="uk-card uk-card-default"><a @click="adicionaAssistido(filmeLista.id)" class="uk-margin-remove uk-link-heading" style="color:black;">Nao Assistido</a></div>
                        <div v-if="filmeLista.assistido" class="uk-card uk-card-primary"><p class="uk-margin-remove uk-link-heading" style="color:white;">Ja Assistido</p></div>
                        <img :src="urlPost+filmeLista.poster_path" alt="">
                        <div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-default">
                            <p class="uk-text-bold"> {{filmeLista.title}} </p>
                            Avaliação: <span class="uk-badge">{{filmeLista.vote_average}}</span>
                        </div>
                    </div>
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
            urlPost: 'https://image.tmdb.org/t/p/w185/',
            filmesLista:[]
        }
    },
    async created(){
        this.listarFilmes()
    },
    methods:{
        async listarFilmes(){
            const perfil = await localStorage.getItem('perfil')
        User.minhaLista(perfil).then(resposta=>{
            if(resposta.erro){
                return this.$router.push({ name: 'Login' })
            }
            if(resposta.data.assistido){
                console.log('Ok')
            }
            console.log(resposta)
            this.filmesLista = resposta.data
        })
        },
        async adicionaAssistido(id_filme){
            const perfil = localStorage.getItem('perfil')
            await User.adicionaAssistido(perfil, id_filme).then(resposta=>{
                console.log(resposta)
                this.listarFilmes()
            })
        },
        async logout(){
            try {
                const resposta = await localStorage.removeItem('token')
                this.$router.push({ name: 'Login' })
            } catch (error) {
                
                return {status: 'Erro'}
            }
                
        }
    }
}
</script>