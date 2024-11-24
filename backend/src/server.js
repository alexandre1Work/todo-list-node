//importando o app
const app = require('./app');
//Importando as variáveis ambiente
require('dotenv').config();

const PORT = process.env.PORT || 3333;

//app vai ouvir (rodar) na porta 7777
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`)); 
