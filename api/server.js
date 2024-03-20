const express = require('express');
const app = express('');
const bodyParser = require('body-parser');
const produtoRoutes = require('./routes/produtoRoutes');
const tamanhoRoutes = require('./routes/tamanhoRoutes');
const modeloRoutes = require('./routes/modeloRoutes');
const tipoRoutes = require('./routes/tipoRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const regiaoRoutes = require('./routes/regiaoRoutes');
const userRoutes = require('./routes/userRoutes')
const { createTables,createBackUp } = require('./database/initDb');

const cors = require("cors")
const IntegracaoService = require("./Service/IntegracaoNex")


createTables();
createBackUp();


IntegracaoService.cadastraProdutoex();
  
 





app.use(express.static(__dirname + '../public'))


app.use('/codebarimages',express.static(__dirname + '/imagens'))

                                                                                                 
// Middleware para análise de JSON no corpo das solicitações
app.use(bodyParser.json());

// Cors
app.use(cors())

// Rotas
app.use('/api',produtoRoutes);
app.use('/api',tamanhoRoutes);
app.use('/api',modeloRoutes);
app.use('/api',tipoRoutes);
app.use('/api',fornecedorRoutes);
app.use('/api',regiaoRoutes);
app.use('/api',userRoutes);

// Iniciar o servidor
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});