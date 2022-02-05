const bcrypt = require('bcrypt');
const express = require('express');
require('dotenv/config');

const router = express.Router();

const User = require('../../Models/User');

router.use((req, res, next) => {
    next();
});

router.post('/register', async (req, res) => {

    const {name, password} = req.body;

    await User.create({
        name,
        password: bcrypt.hashSync(password, 10),
        permission: 'USER'
    }).then((response) => {
        res.status(201).json({msg: 'O usuário foi criado com sucesso!'})
    });

    res.status(422).json({msg: 'Não foi possível criar usuário.'});
    
});

module.exports = router;