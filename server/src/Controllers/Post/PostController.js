const express = require('express');
const Post = require('../../Models/Post');
const ProtectedRoute = require('../../Middlewares/AuthMiddleware');
const User = require('../../Models/User');
const { PrismaClient } = require('@prisma/client');
const HiddenPassword = require('../../Utils/HiddenPassword');

const prisma = new PrismaClient();

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/all/page/:page', async (req, res) => {

    let limit = 3;
    let page = parseInt(req.params.page);

    const post = await prisma.post.findMany({
        skip: page,
        take: limit,
        orderBy: {
            id: 'desc'
        },
        include: {
            user: true,
            categorie: true
        }
    }).then(response => {
        res.status(200).json({ response });
    }).catch(err => {
        res.status(500).json({ err });
    });

});


// posts por id
router.get('/id/:id', async (req, res) => {

    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            user: true,
            categorie: true
        }
    }).then(response => {
        res.status(200).json({ post: response });
    }).catch(err => {
        res.status(500).json({ msg: 'Não foi possível obter artigos', err });
    });

});

// todos os posts do usuario logado
router.get('/userLogged', ProtectedRoute, async (req, res) => {

    const post = await prisma.post.findMany({
        where: {
            authorId: req.userLoggedIn.id
        },
        include: {
            user: true
        }
    }).then(response => {
        res.status(200).json({ posts: response });
    }).catch(err => {
        res.status(500).json({ msg: 'Não foi possível obter artigos', err });
    });
});

// get all categories
router.get('/categorie/all', async (req, res) => {

    try {
        let categories = await prisma.categorie.findMany({});
        res.status(200).json({categories});
    } catch(err) {
        res.status(500);
    }
    
});

// cria categoria
router.post('/categorie/new', ProtectedRoute, async (req, res) => {

    const { title } = req.body;
    
    if(req.userLoggedIn.permissions == 'ADMIN') {
        try {
            await prisma.categorie.create({ data: { title } });
            res.status(201).json({msg: 'Categoria adicionada!'});
        } catch(err) {
            res.json({err});
        }
    }

    return res.status(401);
    
});

router.get('/categorie/:id?', async (req, res) => {

    try {

        const {id} = req.params;

        const find = await prisma.post.findMany({
            include: {
                categorie: true,
                user: true
            }
        });

        let response = find.filter(post => {
            delete post.user.password;
            return post;
        });

        if(id) {
            response = response.find(post => post.categorie.id == id);
            return res.status(200).json({posts: response});
        }

        return res.status(200).json({posts: response});

    } catch(err) {
        res.json({err});
    }
    
    return res.json({params: req.params});
});

router.post('/new', ProtectedRoute, async (req, res) => {

    const { title, content, categorie } = req.body;
    const user_id = req.userLoggedIn.id;

    const post = await prisma.post.create({
        data: {
            authorId: user_id,
            title,
            content,
            categorieId: parseInt(categorie)
        }
    }).then(response => {
        res.status(201).json({ msg: 'Artigo criado!' });
    }).catch(err => {
        res.status(500).json({ msg: 'Não foi possível criar post', err });
    });

});

router.put('/id/:id', ProtectedRoute, async (req, res) => {

    try {
        const post = await prisma.post.findUnique({ where: { id: parseInt(req.params.id) } });

        if (post && post.authorId == parseInt(req.userLoggedIn.id)) {
            await prisma.post.update({ where: { id: post.id }, data: { title: req.body.title || undefined, content: req.body.content || undefined } });
            res.status(200).json({ msg: 'Artigo atualizado!' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Não foi possível atualizar o artigo!', err });
    }

});

router.delete('/id/:id', ProtectedRoute, async (req, res) => {
    try {
        const post = await prisma.post.findUnique({ where: { id: parseInt(req.params.id) } });

        if (post && post.authorId == parseInt(req.userLoggedIn.id)) {
            await prisma.post.delete({ where: { id: post.id }, });
            res.status(200).json({ msg: 'Artigo atualizado!' });
        }

    } catch (err) {
        res.status(500).json({ msg: 'Não foi possível deletar o artigo!', err });
    }
});

module.exports = router;