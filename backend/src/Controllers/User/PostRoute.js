const express = require('express');
const Post = require('../../Models/Post');
const ProtectedRoute = require('../../Middlewares/AuthMiddleware');

const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

// obtem todos os posts
router.get('/all', async (req, res) => {

    await Post.findAll({order: [['id', 'DESC']]})
        .then((response) => {
            res.status(200).json({posts: response});
        }).catch(err => {
            res.status(500).json({err});
        });
    
});


// posts por id
router.get('/id/:id', async (req, res) => {
    await Post.findOne({where: {id: req.params.id} })
        .then(response => {
            res.status(200).json({post: response});
        }).catch(err => {
            res.status(500).json({msg: 'Não foi possível obter postagens', err});
        })
});

// todos os posts do usuario logado
router.get('/userLogged', ProtectedRoute, async (req, res) => {
    await Post.findAll({where: {username: req.userLoggedIn.username}, order: [['id', 'DESC']] })
        .then(response => {
            res.status(200).json({posts: response});
        }).catch(err => {
            res.status(500).json({msg: 'Não foi possível obter postagens', err});
        })
});

router.post('/new', ProtectedRoute, async (req, res) => {
    
    const {title, content} = req.body;
    const author  = req.userLoggedIn.name;
    const username = req.userLoggedIn.username;

    await Post.create({
        author,
        username,
        title,
        content
    }).then((response) => {
        res.status(201).json({msg: 'Postagem criada!'});
    }).catch((err) => {
        res.status(500).json({msg: 'Não foi possível criar post', err});
    });
    
});

module.exports = router;