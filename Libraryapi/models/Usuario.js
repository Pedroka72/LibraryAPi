module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endereco: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telefone: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'Usuarios'
    });

  Usuario.associate = (models) => { Usuario.hasMany(models.Emprestimo, { foreignKey: 'usuarioId' });

};

    return Usuario;

};