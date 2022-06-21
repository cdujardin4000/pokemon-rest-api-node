const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth') //Midellware d'authentification

module.exports = (app) => {
    app.delete(
        '/api/pokemons/:id',
        auth,
        (req, res) => {
            Pokemon.findByPk(req.params.id).then(
                pokemon => {
                    if (pokemon === null) {
                        const message = `Le pokemon demandé n'existe pas.`
                        return res.status(404).json({message})
                    }
                    const pokemonDeleted = pokemon;
                    Pokemon.destroy({
                        where: { id: pokemon.id }
                    })
                    .then(() => {
                        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
                        res.json({message, data: pokemonDeleted })
                    })
                }
            )
            .catch(error => {
                const message = `Le pokemon n'à pas pu être supprimé, réessayez plus tard.`
                res.status(500).json({message, data: error})
            })
        }
    )
}