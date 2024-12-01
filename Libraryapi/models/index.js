const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('seu_bancodedados', 'seu_usuario', 'sua_senha', {
    host: 'localhost',
    dialect: 'mysql'
});

// Importa os modelos
const Usuario = require('./Usuario')(sequelize, DataTypes);
const Livros = require('./Livros')(sequelize, DataTypes);
const Emprestimo = require('./Emprestimo')(sequelize, DataTypes);

const db = {
    sequelize,
    Sequelize,
    Usuario,
    Livros,
    Emprestimo
};

// Define os relacionamentos (se necessário)
Usuario.hasMany(Emprestimo, { foreignKey: 'usuarioId' });
Emprestimo.belongsTo(Usuario, { foreignKey: 'usuarioId', onDelete: 'SET NULL' });

Livros.hasMany(Emprestimo, { foreignKey: 'livroId' });
Emprestimo.belongsTo(Livros, { foreignKey: 'livroId', onDelete: 'SET NULL' });

module.exports = db;