<template>
  <div>
    
  </div>
</template>
<script>
import axios from 'axios'
const http = axios.create({
	baseURL: 'http://localhost:3000/'
})
export default {
  async created(){
    try{
      const resposta = await http.get('page/inicio', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    } catch (err){
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>