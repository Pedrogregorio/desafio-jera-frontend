import axios from 'axios'
const http = axios.create({
	baseURL: 'http://localhost:3000/'
	// baseURL: 'https://desafio-jera-back.herokuapp.com/'
})

export default {
	async autenticacao(email, senha){
		try {
		  const resposta = await http.post('cadastro/autenticacao', {
			email: email,
			senha: senha
		  })
		  const token = resposta.data.token
		  this.msgErro = ''
		  localStorage.setItem('token', token)
		  return resposta
		} catch (error) {
			return { erro:true }
		}
	},

	async cadastrar(email, senha, nome, nascimento){
		try {
			const resposta = await http.post('cadastro/registro', {
				email: email,
				senha: senha,
				nome: nome,
				nascimento: nascimento,
			})
			return resposta
		} catch (error) {
			return error
		}
		
	},
	async listarPerfil(){
		try {
            const resposta = await http.get('page/perfil', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            return resposta
        } catch (error) {
            return { erro:true }           
        }
	},
	async setPerfil(perfil){
		try{
		
			localStorage.setItem('perfil', perfil)
			return {status: 'Ok'}
		} catch (error) {
			return {erro: 'Erro'}
		}
	},
	async listarPop(){
		try{
			const resposta = await http.get('page/inicio', {
			  headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			  }
			})
			return resposta
		  } catch (erro){
			return { erro:true }
		  }
	},
	async salvarLista(id_filme, id_perfil){
		try {
		  const resposta = await http.post('page/salvando', {filmes: id_filme, perfil: id_perfil}, {
			headers: {
			  Authorization: 'Bearer ' + localStorage.getItem('token')
			}
		  })
		  return resposta  
		} catch (error) {
			return { erro:true }
		}
		
	},
	async pesquisa(pesquisa, pagina){
		try {
		 const resposta = await http.post('page/buscarFilmes', {pesquisa: pesquisa, pagina: pagina}, {
		  headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		  }
		})
		  return resposta
		} catch (error) {
			return { erro:true }
		}
		
	},
	async minhaLista(perfil){
		try {
            const resposta = await http.post('page/lista',{perfil:perfil},
                {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
            	})
			return resposta
			
        } catch (error) {
            return { erro:true }
        }
	},
	async adicionaPerfil(nome){
		try {
			const resposta = await http.post('page/cria_perfil', {nome: nome}, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token')
				}
			})
			return resposta
		} catch (error) {
			return {erro: 'Nao foi possivel criar o perfil'}
		}
	}

}