module.exports = (sequelize, DataTypes) => {
  const Emprestimo = sequelize.define(
    "Emprestimos",
    {
      dataEmprestimo: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      dataDevolucao: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pendente",
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
          model: "Usuarios", 
          key: "id",
        },
        onDelete: "SET NULL", 
        onUpdate: "CASCADE",
      },
      livroId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Livros",
          key: "id",
        },
        onDelete: "SET NULL", 
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "Emprestimos",
    }
  );

  Emprestimo.associate = (models) => {
    Emprestimo.belongsTo(models.Livro, { foreignKey: 'livroId' });
        Emprestimo.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
  };
  
  return Emprestimo;
};
