const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http') 
const routes = require('./routes')
const { setupWebsocket } = require('./websocket')

const app = express() // express é uma função
const server = http.Server(app) //extraindo servidor http de dentro do express

setupWebsocket(server)

mongoose.connect('mongodb+srv://lucasilva:lucasilva@cluster0-lhz9x.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(cors())
app.use(express.json()) //entender requisições que tem o corpo no formato JSON - precisa vir antes das rotas
app.use(routes) //cadastrando as rotas

server.listen(3333) //definindo uma porta para a execução da aplicação

// principais métodos HTTP:
// GET -> Buscando uma informação. Ex: Listar usuários
// POST -> Criar alguma informação. Ex: Salvar produto
// PUT -> Alterar algum registro 
// DELETE -> Excluir algum registro

// Tipos de parâmetros
// Query Params: São mais utilizados no método get - visíveis no endereço da aplicação - req.query (Filtrar, ordenar, paginar...)
// Route Params: req.params (identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de um registro)

// mongoDB (Não-relacional)