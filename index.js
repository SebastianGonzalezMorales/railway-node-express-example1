const express = require("express");
const boddyParser = require("body-parser");
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

app.use(boddyParser.json());
app.use(morgan('tiny'));
//app.use(errorHandler);

const api = process.env.API_URL;

const usersRoutes = require('./routes/users');

app.use(`${api}/users`, usersRoutes);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'my-app'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=>{
    console.log(err);
})

const PORT = process.env.PORT || 3977;

app.get("/", (req, res) => {
    res.send({msg: "Hola sebastian!"});
});

app.post("/welcome", (req, res) => {
    const { username } = req.body;
    res.status(200).send({msg: `Hola. ${username}`});
});


app.listen(PORT, () => {
    console.log(`Tu server está listo en el puerto ${PORT}`);
})