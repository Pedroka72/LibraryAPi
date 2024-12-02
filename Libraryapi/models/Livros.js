module.exports = (sequelize, DataTypes) => {
    const Livros = sequelize.define('Livros', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING
        },
        anoPublicacao: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Livros'
    });

    Livros.associate = (models) => { Livros.hasMany(models.Emprestimo, { foreignKey: 'livroId' }); 

};
    return Livros;
};