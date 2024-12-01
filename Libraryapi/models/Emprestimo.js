module.exports = (sequelize, DataTypes) => {
    const Emprestimo = sequelize.define('Emprestimos', {

        dataEmprestimo: {
            type: DataTypes.DATE,
            allowNull: true
        },
        dataDevolucao: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pendente'
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: true, // Permitir NULL para suportar SET NULL
            references: {
                model: 'Usuarios', // Nome da tabela relacionada
                key: 'id'
            },
            onDelete: 'SET NULL', // Define o comportamento ao excluir o usuário
            onUpdate: 'CASCADE'
        },
        livroId: {
            type: DataTypes.INTEGER,
            allowNull: true, // Permitir NULL para suportar SET NULL
            references: {
                model: 'Livros', // Nome da tabela relacionada
                key: 'id'
            },
            onDelete: 'SET NULL', // Define o comportamento ao excluir o livro
            onUpdate: 'CASCADE'
        }
    }, {
        tableName: 'Emprestimos'
    });

    return Emprestimo;
};