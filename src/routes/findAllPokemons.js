const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize') //Opérateurs de recherche
const auth = require('../auth/auth') //Midellware d'authentification
module.exports = (app) => {
    app.get(
        '/api/pokemons',
        auth,
        (req, res) => {
            if(req.query.name) {
                const name = req.query.name
                const limit = parseInt(req.query.limit) || 5
                if(name.length < 2){
                    const message = `Votre recherche doit contenier au moins 2 caractères.`
                    res.status(400).json({message})
                }
                return Pokemon.findAndCountAll({
                    where: {
                        name: {// 'name' esl la propriété du modele
                            [Op.like]: `%${name}%` // 'name' est le critère de recherche
                        }
                    },
                    order: ['name'],
                    limit: limit
                })
                .then(({count, rows}) => {
                    const message = `Il y a ${count} pokémons qui correspondnt au terme de recherche ${name}.`
                    res.json({ message, data: rows })
                })
            } else {
                Pokemon.findAll({order: ['name']})
                    .then(pokemons => {
                        const message = 'La liste des pokémons a bien été récupérée.'
                        res.json({ message, data: pokemons })
                    }
                )
                .catch(error => {
                    const message = `La liste des pokémons n'a pas pu être  récupérée, réessayez plus tard.`
                    res.status(500).json({message, data: error})
                })
            }
        }
    )
}