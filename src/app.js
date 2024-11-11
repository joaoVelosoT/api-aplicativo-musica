 
const express = require('express');
const connectDB = require('./config/database');
const app = express();
const PORT = process.env.PORT 
const router = require('./routes/router');


app.use(express.json());
app.use('/', router);


app.listen(PORT, async() => {
    try {
        await connectDB();
        console.log("---------------------------------");
        console.log("Servidor no ar");
        console.log("---------------------------------");

    } catch (error) {
        console.error("Erro ao conectar no Banco de dados", error);
    }
})


