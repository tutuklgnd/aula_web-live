const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema ({
    titulo: {type: String},
    sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema({
    login: {type: String, required : true, unique: true},
    password: {type: String, required: true}
})

usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuário", usuarioSchema)

// let filmes = [
//     {
//         titulo: "Vingadores: Ultimato",
//         sinopse: "Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos. Com Tony Stark vagando perdido no espaço sem água e comida, Steve Rogers e Natasha Romanov lideram a resistência contra o titã louco."
//     },
//     {
//         titulo: "Homem-Aranha: Um Novo Dia",
//         sinopse: "Após o mundo ter esquecido seu nome, Peter Parker inicia um novo capítulo em sua vida, conciliando as aulas da faculdade, um trabalho de meio período e sua responsabilidade como o Homem-Aranha. Mas quando uma força misteriosa começa a desmantelar a cidade de dentro para fora, Peter se vê preso entre inimigos poderosos, legados antigos e aliados inesperados."
//     },
// ]

//get http://localhost:3000
app.get('/hey', (req, res) => {
    res.send('hey')
})
app.get('/filmes',  async (req, res) => {
    // buscar no banco a base atualizada 
    const filmes = await Filme.find()
    //envia a base atualizada para o cliente como resposta
    res.json(filmes)
})
app.post('/filmes', async (req, res) => {
    //obtem os dados digitados pelo cliente
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar o objeto json
    const filme = new Filme ({titulo: titulo, sinopse: sinopse})
    //acrescenta o filme novo à lista de filmes
    await filme.save()
    // buscar no banco a base atualizada 
    const filmes = await Filme.find()
    //envia a base atualizada para o cliente como resposta
    res.json(filmes)
})

app.post('/signup', async (req, res) =>{
    const login = req.body.login
    const password = req.body.password
    const usuario = new Usuario({
        login: login,
        password: password
    })
    const respostaMongo = await usuario.save()
    console.log(respostaMongo)
    res.end()
})

async function conectarAoMongo () {
    await mongoose.connect(`mongodb+srv://antaxeyt_db_user:Antonio1227*@mauasp.mnv6e1d.mongodb.net/`)
}

app.listen(3000, () => {
    try {
        conectarAoMongo()
        console.log ("server up & running & mongo connected")
    }
    catch (e) {
        console.log("erro: ", e)
    }
})    