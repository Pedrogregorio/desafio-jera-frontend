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
                    <li class="uk-active"><a href="#">Sair</a></li>
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
import axios from 'axios'
const http = axios.create({
	baseURL: 'http://localhost:3000/'
})
export default {
    data(){
        return{
            urlPost: 'https://image.tmdb.org/t/p/w185/',
            filmesLista:[]
        }
    },
    async created(){
        try {
            const resposta = await http.get('page/lista',
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
            })
            
            this.filmesLista = resposta.data
            console.log(resposta.data)
        } catch (error) {
            console.log(error)
        }
    }
}
</script>