const express = require('express');
const Post = require('../../Models/Post');
const ProtectedRoute = require('../../Middlewares/AuthMiddleware');
const User = require('../../Models/User');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

// obtem todos os posts
router.get('/all', async (req, res) => {

    User.hasMany(Post, {foreignKey: 'user_id'});
    Post.belongsTo(User, {foreignKey: 'user_id'});
    
    await Post.findAll({
            order: [['id', 'DESC']],
            include: [{
                model: User,
                attributes: ['name']
            }]
        })
        .then((response) => {
            res.status(200).json({posts: response});
        }).catch(err => {
            res.status(500).json({err});
        });
    
});

router.get('/all/page/:page', async (req, res) => {

    User.hasMany(Post, {foreignKey: 'user_id'});
    Post.belongsTo(User, {foreignKey: 'user_id'});

    let limit = 1;
    let offset = 0 + (req.params.page - 1) * limit;
    
    await Post.findAndCountAll({
        order: [['id', 'DESC']],
        limit,
        offset,
        include: [{
            model: User,
            attributes: ['name']
        }]
    })
    .then(response => {
        res.status(200).json({posts: {page: parseInt(req.params.page), ...response}})
    }).catch(err => {
        res.status(500).json({err});
    });

});


// posts por id
router.get('/id/:id', async (req, res) => {

    User.hasMany(Post, {foreignKey: 'user_id'});
    Post.belongsTo(User, {foreignKey: 'user_id'});
    
    await Post.findOne({
            where: {id: req.params.id},
            include: [{
                model: User,
                attributes: ['name']
            }]
        })
        .then(response => {
            res.status(200).json({post: response});
        }).catch(err => {
            res.status(500).json({msg: 'Não foi possível obter postagens', err});
        })
});

// todos os posts do usuario logado
router.get('/userLogged', ProtectedRoute, async (req, res) => {

    User.hasMany(Post, {foreignKey: 'user_id'});
    Post.belongsTo(User, {foreignKey: 'user_id'});
    
    await Post.findAll({
        where: {user_id: req.userLoggedIn.id}, 
        order: [['id', 'DESC']],
        include: [{
            model: User,
            attributes: ['name']
        }]
    })
        .then(response => {
            res.status(200).json({posts: response});
        }).catch(err => {
            res.status(500).json({msg: 'Não foi possível obter postagens', err});
        })
});

router.post('/new', ProtectedRoute, async (req, res) => {
    
    const {title, content} = req.body;
    const author  = req.userLoggedIn.name;
    const user_id = req.userLoggedIn.id;

    await Post.create({
        author,
        user_id,
        title,
        content
    }).then((response) => {
        res.status(201).json({msg: 'Postagem criada!'});
    }).catch((err) => {
        res.status(500).json({msg: 'Não foi possível criar post', err});
    });
    
});

module.exports = router;