const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const User = require('../../Models/User');
const CheckField = require('../../Utils/Validation');
const ProtectedRoute = require('../../Middlewares/AuthMiddleware');

const router = express.Router();
const JWTSecret = process.env.JWT_PASS;

router.use((req, res, next) => {
    next();
});

router.get('/get', ProtectedRoute, async (req, res) => {
    await User.findAll()
        .then((response) => {
            res.status(200).json({response});
        }).catch(err => {
            res.status(404).json({msg: 'Não foi possível retornar usuários'});
        });    
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (CheckField(username) && CheckField(password)) {
        const account = await User.findOne({ where: { username } });

        if (account != null) {
            if (bcrypt.compareSync(password, account.password)) {
                if (account.permissions == 'ADMIN') {
                    jwt.sign({ id: account.id, username: account.username, name: account.name, permissions: account.permissions }, JWTSecret, (err, token) => {
                        if (err) {
                            res.status(500).json({ msg: 'Erro interno' });
                        } else {
                            res.status(200).json({ token });
                        }
                    });
                } else {
                    res.status(406).json({msg: 'Você não possui permissão'})
                }
            } else {
                res.status(401).json({ msg: 'Senha inválida' });
            }
        } else {
            res.status(404).json({ msg: 'Usuário não encontrado' });
        }

    } else {
        res.status(400).json({ msg: 'Campos não podem ser nulos!' });
    }

});

router.post('/permission', ProtectedRoute, async(req, res) => {

    await User.update(
            {permissions: req.body.permission},
            {where: {id: req.body.id}}
        )
        .then(response => {
            res.status(200).json({response});
        }).catch(err => {
            res.status(404).json({err});
        });

});

router.post('/register', async (req, res) => {

    const { name, username, password } = req.body;

    await User.create({
        name,
        username,
        password: bcrypt.hashSync(password, 10),
        permission: 'USER'
    }).then((response) => {
        res.status(201).json({ msg: 'O usuário foi criado com sucesso!' });
    }).catch(err => {
        res.status(422).json({ msg: 'Não foi possível criar usuário.', err });
    });

});

router.get('/revalidate', ProtectedRoute, async (req, res) => {

    await User.findOne({where: {id: req.userLoggedIn.id}})
        .then(response => {
            let user = {
                id: response.id,
                name: response.name,
                username: response.username,
                permissions: response.permissions
            }
            res.status(200).json({user});  
        }).catch(err => {
            res.status(400).json({err});
        });
    
});

module.exports = router;