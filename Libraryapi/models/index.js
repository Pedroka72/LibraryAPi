const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('seu_banco', 'seu_user', 'sua_senha', {

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

db.Usuario.hasMany(db.Emprestimo, { foreignKey: 'usuarioId', as: 'emprestimos' });
db.Emprestimo.belongsTo(db.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

db.Livros.hasMany(db.Emprestimo, { foreignKey: 'livroId', as: 'emprestimos' });
db.Emprestimo.belongsTo(db.Livros, { foreignKey: 'livroId', as: 'livro' });

module.exports = db;
