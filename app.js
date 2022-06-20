const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

app.use(favicon(__dirname + '/favicon.ico'))
   .use(morgan('dev'))
   .use(bodyParser.json()) //Pour transformer le json en string pour les POST

sequelize.initDb()

//POINTS DE TERMINAISONS
//POKEMONS
require('./src/routes/findAllPokemons')(app) //racourci de syntaxe sans la variable intermédiaire
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
//AUTH
require('./src/routes/login')(app)
//GESTION DES ERREURS 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée!!!'
    res.status(404).json({message})
})

app.listen(
    port,
    () => console.log(`Notre application Node est démarrée sur: http://localhost:${port}`)
)