const express = require('express');
require('dotenv').config();
const conn = require('./db/conn');
const UserRoute = require('./Controllers/User/UserRoute');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes

app.get('/', function (req, res, next) {
    res.send('Endpoint do meu blog!');
});

app.use('/api/users', UserRoute);


//------------------------------------------------------

conn.sync()
    .then(() => {
    app.listen(process.env.PORT);
})
    .catch(error => {console.log(error)});
// app.listen(process.env.port);