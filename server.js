const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");

dotenv.config();
const app = express();
const port = process.env.PORT;
const docs = require('./docs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send({Obi_Wan: "Hello there", Grievous: "General Kenobi"});
});

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

app.listen(port, () => {
    console.log('port: 3000');
});
