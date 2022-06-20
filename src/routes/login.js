const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/privatekey')


module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        User.findOne({ where: { username: req.body.username } }).then(user => {
            if(!user){
                const message = `Le username ou le mot de passe sont incorrect.`
                return res.status(404).json({ message })
            }
            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(!isPasswordValid) {
                    const message = `Le username ou le mot de passe sont incorrect.`
                    return res.status(401).json({ message })
                }
                //JWT
                const token = jwt.sign(
                    { userId: user.id },
                    privateKey,
                    { expiresIn: '24h' },
                )
                const message = `L'utilisateur a été connecté avec succès`;
                return res.json({ message, data: user, token })
            })
        })
        .catch(error => {
            const message = `La connection à échoué, veuillez recommencer`;
            return res.json({ message, data: error })
        })
    })
}
/**
module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            bcrypt.compare(
                req.body.password,
                user.password
        )
        .then( isPasswordValid => {
            if (isPasswordValid) {
                const message = `L'utilisateur a été connecté avec succès`;
                return res.json({message, data: user})
            }
        })})
    })
}
**/