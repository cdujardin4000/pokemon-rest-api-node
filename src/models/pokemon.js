const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Fée', 'Vol']

//LE NOM DU MODELE EST TJ AU SINGULIER ET CR2ERA LA TABLE AVEC 'S' A LA FIN
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Pokemon', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg : 'Le nom est déja pris'
                },
                validate : {
                    notEmpty : { msg : 'La chaine de caractère ne peux pas rester vide pour le champs name'},
                    notNull: { msg : 'Le champ name est requis.'}
                }
            },
            hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate : {
                    min : {
                        args : [0],
                        msg : 'les points de vie ne peuvent pas etre inférieurs a 0'
                    },
                    max : {
                        args : [999],
                        msg : 'les points de vie ne peuvent pas etre supérieurs a 1000'
                    },
                    isInt : { msg : 'Utilisez uniquement des entiers pour les points de vie.'},
                    notNull: { msg : 'Le champ hp est requis.'}
                }
            },
            cp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate : {
                    min : {
                        args : [0],
                        msg : 'les points de dégats ne peuvent pas etre inférieurs a 0'
                    },
                    max : {
                        args : [999],
                        msg : 'les points de dégats ne peuvent pas etre supérieurs a 1000'
                    },
                    isInt : { msg : 'Utilisez uniquement des entiers pour les points de dégat.'},
                    notNull: { msg : 'Le champ cp est requis.'}
                }
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    isUrl : { msg : 'Utilisez uniquement une Url pour le champs picture.'},
                    notNull: { msg : 'Le champ picture est requis.'}
                }
            },
            types: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    //DB -> API REST
                    return this.getDataValue('types').split(',')
                },
                set(types) {
                    //API REST -> DB
                    this.setDataValue('types', types.join())
                },
                validate : {
                    isTypesValid(value){
                        if (!value) {
                            throw new Error('Vous devez ajouter au moins un type')
                        }
                        if(value.split(',').length > 3){
                            throw new Error('Vous ne pouvez pas ajouter plus de 3 erreurs')
                        }
                        value.split(',').forEach(type => {
                            if(!validTypes.includes(type)) {
                                throw new Error(`Le type doit appartenir à la liste suivante : ${validTypes}`)
                            }
                        })
                    }
                }
            }
        },
        //OPTIONS
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        }
    )
}