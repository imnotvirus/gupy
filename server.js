const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("requiredir");
const cors = require("cors");

//iniciando APP
const app = express();
app.use(express.json());
app.use(cors());

//iniciando DB
mongoose.connect('mongodb://localhost:27017/nodeapi',
 {
    useNewUrlParser: true
});
requireDir("./src/models");

//Rotas
app.use('/api', require('./src/routes'))

app.listen(3000);