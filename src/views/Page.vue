<template>
  <div>
    <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
        <li class="uk-active"><a href="/lista">Minha Lista</a></li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li class="uk-active"><a href="#">Sair</a></li>
        </ul>
      </div>
    </nav>
    <div class="uk-container">
      <div class="uk-aling-center"><h1>Filmes Populares</h1></div>
      <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider>
        <ul class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m">
          <li v-for="filme in filmes" :key="filme.id">
            <div class="uk-panel">
              <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
                <div class="uk-card uk-card-default"><a @click="salvarLista(filme.id)" class="uk-margin-remove uk-link-heading" style="color:black;">+ Adicionar à lista</a></div>
                <img :src="urlPost+filme.poster_path" alt="">
                <div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-default" style="color:black;">
                  <p class="uk-text-bold"> {{filme.title}} </p>
                  Avaliação: <span class="uk-badge">{{filme.vote_average}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
      </div>     
      <hr>
      <div class="uk-margin"> 
        <form @submit.prevent="pesquisa">
          <div class="uk-margin">
            <input class="uk-input uk-form-width-medium" v-model="txt_pesquisa" type="text" placeholder="Pesquisar Filme">
          </div>
          <button class="uk-button uk-button-primary" type="submit"> Pesquisar </button>
        </form>
      </div>
      <div class="uk-grid-column-small uk-grid-row-large uk-child-width-1-3@s uk-text-center" uk-grid>
        <div class="uk-text-center" v-for="filmeLista in filmesLista" :key="filmeLista.id">
          <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
          <div class="uk-card uk-card-default"><a @click="salvarLista(filmeLista.id)" class="uk-margin-remove uk-link-heading" style="color:black;">Adicionar à lista</a></div>
          <img :src="urlPost+filmeLista.poster_path" alt="">
          <div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-default">
            <p class="uk-text-bold"> {{filmeLista.title}} </p>
            Avaliação: <span class="uk-badge">{{filmeLista.vote_average}}</span>
          </div>
          </div>
        </div>
      </div>
      <div class="uk-margin uk-flex-center" v-if="paginacao">
        <ul class="uk-pagination" uk-margin>
          <li><a href="#"><span uk-pagination-previous></span></a></li>
          <li v-for="pagina in paginas" :key="pagina"><a @click="pesquisa(pagina)">{{pagina}}</a></li>
          <li><a href="#"><span uk-pagination-next></span></a></li>
        </ul>
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
      filmes: [],
      paginacao: false,
      filmesLista:[],
      paginas: 20,
      txt_pesquisa: '',
      msgErro: '',
      urlPost: 'https://image.tmdb.org/t/p/w185/',
      
    }
  },
  async created(){
    try{
      const resposta = await http.get('page/inicio', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      this.filmes = resposta.data.results
    } catch (err){
      this.$router.push({ name: 'Home' })
    }
  },
  methods:{
    async salvarLista(id){
      try {
        const resposta = await http.post('page/salvando', {filmes: id}, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        if(resposta.data.erro){
          return UIkit.notification({
            message: resposta.data.erro,
            pos: 'top-center',
            status: 'danger',
            timeout: 5000
        });  
        }
        UIkit.notification({
            message: 'Filme Salvo na Lista',
            pos: 'top-center',
            status: 'success',
            timeout: 5000
        });  
      } catch (error) {
        console.log(error)
      }
      
    },
    async pesquisa(pagina){
      try {
       const resposta = await http.post('page/buscarFilmes', {pesquisa: this.txt_pesquisa, pagina: pagina}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
          
        }
      })
        console.log(resposta)
        this.filmesLista = resposta.data
        this.paginacao = true
      } catch (error) {
        this.msgErro = "Erro"
      }
      
    }
  }
}
</script>