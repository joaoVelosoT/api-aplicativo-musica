const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    try {

        const HOST_DB = process.env.HOST_DB
        const PASS_DB = process.env.PASS_DB
        const URL_DB = process.env.URL_DB

        const mongoURI = `mongodb+srv://${HOST_DB}:${PASS_DB}${URL_DB}/?retryWrites=true&w=majority&appName=database-sonora`;
        await mongoose.connect(mongoURI);
        console.log("Mongodb Conectado !");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados", error);
        process.exit(1);
    }
}

module.exports = connectDB;