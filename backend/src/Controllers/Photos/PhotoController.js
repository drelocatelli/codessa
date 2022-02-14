const express = require('express');
const ProtectedRoute = require('../../Middlewares/AuthMiddleware');
const multer = require('multer');
const multerConfig = require('./multerConfig');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.post('/store', [ProtectedRoute, multer(multerConfig).single('file')], (req, res) => {
    console.log(req.file);

    return res.json({file: req.file.filename});
});

module.exports = router;