# LibraryManagerAPI

## Introdução ao Projeto

### Contexto  
Este projeto foi desenvolvido para a disciplina de *Back-End Frameworks* do curso de Ciência da Computação na UNINASSAU, sob a orientação do professor João Ferreira. O objetivo principal é implementar uma API RESTful para a gestão de bibliotecas, permitindo o controle eficiente de livros, leitores e transações de empréstimo.

### Funcionalidades Principais
- **CRUD de Livros:** Gerenciamento de livros com informações como título, autor, gênero e ano de publicação.
- **CRUD de Usuários:** Registro de usuários com campos para nome, endereço, e-mail e telefone.
- **Gestão de Empréstimos:** Controle de empréstimos e devoluções, com limite de livros por usuário e datas de devolução.
- **Geração de Relatórios:** Relatórios que incluem os livros mais emprestados e usuários com pendências.

---

## Como Configurar o Projeto

### Pré-requisitos  
Certifique-se de ter as seguintes ferramentas instaladas:  
- [Visual Studio Code](https://code.visualstudio.com/)  
- [Node.js](https://nodejs.org/pt)  
- [Git](https://git-scm.com/downloads)  
- [MySQL](https://www.mysql.com/downloads/)

### Passos para Configuração  
1. **Clone o Repositório:**  
   ```bash
   git clone https://github.com/PoisonRose/LibraryApi.git
   cd LibraryApi

2. Instale as Dependências:

   ```bash
   npm install express mysql2 sequelize dotenv body-parser
   
3. Crie um banco de dados chamado library no MySQL.
Copie o arquivo .env.example para .env e ajuste as credenciais conforme seu ambiente MySQL:
makefile

   ```bash
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=library
   DB_PORT=3306
   DB_DIALECT=mysql

4. Pronto!
Agora você está pronto para contribuir com o projeto.

## Ferramentas Utilizadas

| Ferramenta | Descrição                                  |
|------------|--------------------------------------------|
| Git        | Controle de versão                         |
| Node.js    | Ambiente de execução JavaScript            |
| MySQL      | Sistema de gerenciamento de banco de dados |
| Express    | Framework de aplicação web                 |
| mysql2     | Driver para conexão com MySQL              |
| Sequelize  | ORM para MySQL                             |
| body-parser | Middleware para processar corpos de requisições HTTP, permitindo acessar dados enviados via JSON ou formulário |


## Contribuindo
Passos para Contribuir

1. Crie uma Branch:
```bash
  git checkout -b sua-branch

```

2. Atualize sua Branch:

```bash
  Copiar código
  git checkout main
  git pull origin main
  git checkout sua-branch
  git merge main
```
3. Faça Alterações e Commits:

```bash

git add .
git commit -m "Descrição das alterações"

```
4. Sincronize com a Branch Principal:

```bash

git checkout main
git pull origin main
git checkout sua-branch
git merge main
```
5. Envie sua Branch:

```bash
Copiar código
git push origin sua-branch

```
6. Crie um Pull Request:
```bash
Abra um Pull Request no GitHub para revisão e merge.

```
## Equipe do Projeto

| Nome                                  | Função                                |
|---------------------------------------|---------------------------------------|
| João Pedro silva de araujo            | Desenvolvedor                         |
| William coelho de Morais              | Scrum Master                          |
| Gabriel araujo farias de santana      | Desenvolvedor                         |
| Gabriel George de Araújo Figueredo    | Gerente de Configuração               |
| Rodolpho Dihego Freire Da Rocha Filho | Documentador                          |
| João Gunttemberg de Almeida Coimbra   | Documentador                          |


## Licença

Este projeto está licenciado sob a Creative Commons CC0 1.0 Universal. 
Para mais informações, consulte o arquivo LICENSE

