const express = require('express');
require('dotenv').config();
const conn = require('./db/conn');
const UserController = require('./Controllers/User/UserController');
const PostController = require('./Controllers/Post/PostController');
const PhotoController = require('./Controllers/Photos/PhotoController');
const PagesController = require('./Controllers/Pages/PagesController');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

const app = express();

// public files
app.use('/api/public', express.static(__dirname + '/public'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// middlewares
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// routes

app.get('/', function (req, res, next) {
    res.send('Endpoint do meu blog!');
});

app.use('/api/users', UserController);
app.use('/api/posts', PostController);
app.use('/api/photos', PhotoController);
app.use('/api/pages', PagesController);

//------------------------------------------------------

// conn.sync()
//     .then(() => {
//     app.listen(process.env.PORT);
// })
//     .catch(error => {console.log(error)});
    
app.listen(process.env.port);