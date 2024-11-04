const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const mongoURI = "mongodb://localhost:27017/appSonora";
        await mongoose.connect(mongoURI);
        console.log("Mongodb Conectado !");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados", error);
        process.exit(1);
    }
}

module.exports = connectDB;