const express = require('express');
const Post = require('../../Models/Post');
const ProtectedRoute = require('../../Middlewares/AuthMiddleware');
const User = require('../../Models/User');
const { PrismaClient } = require('@prisma/client');

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
            user: true
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
            user: true
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

router.post('/new', ProtectedRoute, async (req, res) => {

    const { title, content } = req.body;
    const user_id = req.userLoggedIn.id;

    const post = await prisma.post.create({
        data: {
            authorId: user_id,
            title,
            content
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