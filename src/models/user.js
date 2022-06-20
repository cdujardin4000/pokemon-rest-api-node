module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: 'Le username est déja pris'
                },
                validate: {
                    notEmpty: {msg: 'La chaine de caractère ne peux pas rester vide pour le champs username'},
                    notNull: {msg: 'Le champ name est requis.'}
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: 'La chaine de caractère ne peux pas rester vide pour le champs username'},
                    notNull: {msg: 'Le champ name est requis.'}
                }
            }
        }
    )
}