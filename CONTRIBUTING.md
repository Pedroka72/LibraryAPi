# CONTRIBUTING

## Descrição do projeto
### Sobre o projeto
Este projeto é um projeto da faculdade UNINASSAU, do curso de Ciência da Computação, disciplina Back-End Frameworks, ensinada pelo professor João Ferreira.  
Para o projeto, os alunos devem criar uma API RESTful para gerenciar livros em uma biblioteca, permitindo o controle de usuários (leitores), livros e empréstimos.

### Funcionalidades principais:
```
-Funcionalidade de CRUD para livros, com os seguintes campos: título, autor, gênero e ano de publicação.

-Funcionalidade de CRUD para usuários, incluindo dados como nome, endereço, e-mail e telefone.

-Sistema para registrar empréstimos e devoluções de livros, com limitação do número de empréstimos por usuário e controle das datas de devolução.

-Relatórios simples, como a listagem dos livros mais emprestados e identificação de usuários com empréstimos pendentes.
```
 
### Como baixar o repositório

**1. Clone o repositório:**   
Para criar uma cópia local do repositório, use o comando:
    `git clone https://github.com/Pedroka72/LibraryApi.git`  
   Isso criará uma cópia local do repositório na pasta onde você executou o comando.  
**2. Acesse o diretório do repositório com o seguinte comando:**  
Entre na pasta do repositório clonado:
    `cd LibraryApi`

Agora você está pronto para contribuir!


## Pré-requisitos

Ainda não há pré-requisitos definidos. Atualizaremos esta seção em breve.

## Como contribuir

Para contribuir com este projeto, siga os passos abaixo. Lembre-se de clonar o repositório conforme as instruções da seção "Como Baixar o Repositório" antes de começar. 

**1.Crie ou Acesse Sua Branch**  
`git checkout -b nome-da-branch`  
**Sempre crie uma nova branch para o seu trabalho. Use o seguinte comando para criar e alternar para a sua branch:**

**2.Mantenha Sua Branch Atualizada com o main:**  

**IMPORTANTE**: Antes de começar a trabalhar, é importante garantir que sua branch esteja atualizada com as últimas mudanças da branch principal (main). Execute os comandos abaixo:

```
git checkout principal
git pull origem pricipal
git checkout nome-da-sua-filial
git mesclar pricipal
```
**3. Faça Suas Alterações e Commit**
 - Depois de realizar as alterações desejadas, adicione os arquivos modificados: 
 `git add .`
 - Faça o commit das suas mudanças com uma mensagem clara e objetiva:  
 `git commit -m "Descrição das alterações feitas"`

**4. Atualize Sua Branch com o Código Mais Recente**
- Se você não fez isso no passo anterior, é uma boa prática sincronizar sua branch com a main antes de fazer o push final.
Execute os seguintes comandos para garantir que sua branch esteja atualizada::

```
git checkout main
git pull origin main
git checkout nome-da-sua-branch
git merge main
```

**5. Envie Sua Branch para o Repositório Remoto**:
Para enviar as alterações feitas para o repositório remoto, use o comando:
`git push origin nome-da-sua-branch`

**6. Abra um Pull Request**:
- No GitHub, acesse o repositório e abra um Pull Request (PR) da sua branch para a main.
Descreva de forma clara as alterações realizadas e peça uma revisão para garantir que o código esteja de acordo com o projeto.


