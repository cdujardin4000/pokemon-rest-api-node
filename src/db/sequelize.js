const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Europe/Brussels',
        },
        logging: false
    }
)

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync(
        {force: true} //POUR LE DEV, RESET LA DB AU DEMARRAGE
    ).then(() => {
        pokemons.map(
            pokemon => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types
                })
            .then(pokemon => console.log(pokemon.toJSON()))//TO JSON POUR AFFICHER QUE CE QUI NOUS INTERESSE
        })

        bcrypt.hash('pikachu', 10)
            .then(hash => {
                User.create({
                    username: 'pikachu',
                    password: hash,
                })
            .then(user => console.log(user.toJSON()))//TO JSON POUR AFFICHER QUE CE QUI NOUS INTERESSE
        })
        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Pokemon, User
}