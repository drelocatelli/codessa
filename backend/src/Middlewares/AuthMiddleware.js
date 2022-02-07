const jwt = require('jsonwebtoken');
require('dotenv/config');

const JWTSecret = process.env.JWT_PASS;

function ProtectedRoute(req, res, next) {
    const authToken = req.headers['authorization'];

    if(authToken != undefined) {
        const bearer = authToken.split(' ');
        const token = bearer[1];

        jwt.verify(token, JWTSecret, (err, data) => {
            if(err) {
                res.status(401).json({msg: 'Token inválido'});
            }else {
                req.userLoggedIn = {id: data.id, username: data.username, name: data.name};
                next();
            }
        });
    }else {
        res.status(401).json({msg: 'Token inválido'});
    }
    
}

module.exports = ProtectedRoute;