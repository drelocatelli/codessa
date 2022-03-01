const express = require('express');
const ProtectedRoute = require('../../Middlewares/AuthMiddleware');
const Pages = require('../../Models/Pages');
const User = require('../../Models/User');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', async (req, res) => {
    
    try {
        const pages = await Pages.findAll({
            limit: 8,
            attributes: ['id', 'title']
        });

        res.status(200).json({pages});
        
    } catch(err) {
        res.status(500).json({msg: 'Ocorreu um erro do servidor'});
    }
    
});

router.get('/page/:id', async (req, res) => {

    try {
        User.hasMany(Pages, {foreignKey: 'user_id'});
        Pages.belongsTo(User, {foreignKey: 'user_id'});

        const findPage = await Pages.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: User,
                attributes: ['name']
            }],
            
        });
        
        res.status(200).json({page: findPage});
        
    } catch(err) {
        res.status(500).json({msg: 'Não foi possível localizar a página', err});
    }
    
});

router.post('/new', ProtectedRoute, async (req, res) => {

    try {
        await Pages.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.userLoggedIn.id
        });

        res.status(200).json({msg: 'Página criada!'});
        
    } catch(err) {
        res.status(500).json({msg: 'Não foi possível criar página'});
    }
    
});

module.exports = router;