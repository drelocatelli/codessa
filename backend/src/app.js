const express = require('express');
require('dotenv').config();
const conn = require('./db/conn');
const UserRoute = require('./Controllers/User/UserRoute');
const PostRoute = require('./Controllers/User/PostRoute');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes

app.get('/', function (req, res, next) {
    res.send('Endpoint do meu blog!');
});

app.use('/api/users', UserRoute);
app.use('/api/posts', PostRoute);


//------------------------------------------------------

conn.sync()
    .then(() => {
    app.listen(process.env.PORT);
})
    .catch(error => {console.log(error)});
    
// app.listen(process.env.port);