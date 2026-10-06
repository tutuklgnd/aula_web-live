const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'

async funtion obterFilmes() {
  const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
  const filmes = (awaoit axios.get(URLCompleta)).data
  console.log(filmes)
}
