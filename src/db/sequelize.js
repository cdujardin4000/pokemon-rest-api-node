const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')

const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT+2',
        },
        logging: false
    }
)

const Pokemon = PokemonModel(sequelize, DataTypes)

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
        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Pokemon
}