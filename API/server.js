const express = require('express')
const cors = require('cors')
const sequelize = require('./db/conexao')
const login = require('./routers/login')
const cadastroUser = require('./routers/cadastro')
const cadastroGestor = require('./routers/criarGestor')
const usuarios = require('./routers/usuarios')
const email = require('./routers/email')

const  app = express()

app.use(cors());
app.use(express.json())



app.use('/login', login)
app.use('/cadastro-user', cadastroUser)
app.use('/cadastro-gestor', cadastroGestor)
app.use('/', usuarios)
app.use('/', email)

async function verificarConexao() {
    try {
      await sequelize.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      process.exit(1);
    }
  }
  
  verificarConexao(); // Chama a função para verificar a conexão ao carregar o arquivo
  
  app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
  });