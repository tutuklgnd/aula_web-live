const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

let filmes = [
  {
    titulo: "O Silêncio dos Inocentes",
    sinopse: "A jovem e talentosa agente do FBI Clarice Starling recebe ajuda do encarcerado Dr. Hannibal Lecter, um psiquiatra brilhante e também um psicopata violento e canibal, para tentar encontrar um assassino em série conhecido como Buffalo Bill.",
  },
  {
    titulo: "De Repente 30",
    sinopse: "Jenna Rink é uma garota que está descontente com sua própria idade. Em seu 13º aniversário, ela faz um pedido: virar adulta. O pedido milagrosamente se torna realidade e, no dia seguinte, Jenna acorda com 30 anos.",
  },
]

//get http://localhost:3000
app.get('/hey', (req,res) => {
  res.send('hey')
})

app.get('/filmes', (req,res) => {
  res.json(filmes)
})

app.post('/filmes', (req,res) => {
  //obtem os dados digitados pelo cliente
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse
  //montar o objeto 
  const filme = {titulo: titulo, sinopse: sinopse}
  //acrescenta o filme novo á lista de filmes
  filmes.push(filme)
  //envia a base atualizada para o cliente como resposta
  res.json(filmes)
})

app.listen(3000, () => console.log('server up and running'))
