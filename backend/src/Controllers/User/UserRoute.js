const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const router = express.Router();

const User = require('../../Models/User');
const CheckField = require('../../Utils/Validation');

router.use((req, res, next) => {
    next();
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    if(CheckField(username) && CheckField(password)) {

        const account = await User.findOne( { where: {username} } );
        
        if(account != null) {
            if(bcrypt.compareSync(password, account.password)){
                res.status(200).json({msg: 'ok'});
            }else {
                res.status(422).json({msg: 'Senha inválida'});
            }
        }else {
            res.status(404).json({msg: 'Usuário não encontrado.'});
        }
        
    }else {
        res.status(400).json({msg: 'Campos não podem ser nulos!'});
    }

});

router.post('/register', async (req, res) => {

    const {name, username, password} = req.body;

    await User.create({
        name,
        username,
        password: bcrypt.hashSync(password, 10),
        permission: 'USER'
    }).then((response) => {
        res.status(201).json({msg: 'O usuário foi criado com sucesso!'});
    }).catch(err => {
        res.status(422).json({msg: 'Não foi possível criar usuário.', err});
    });
    
});

module.exports = router;