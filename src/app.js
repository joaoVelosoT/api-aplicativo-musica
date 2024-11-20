require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const app = express();
const PORT = process.env.PORT || 7050
const router = require('./routes/router');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/', router);


app.listen(PORT, async() => {
    try {
        await connectDB();
        console.log("---------------------------------");
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log("---------------------------------");

    } catch (error) {
        console.error("Erro ao conectar no Banco de dados", error);
    }
})


