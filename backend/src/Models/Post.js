const {DataTypes} = require('sequelize');
const db = require('../db/conn');

const Post = db.define('Post', {
    author: {type: DataTypes.STRING, allowNull: false, required: true},
    username: {type: DataTypes.STRING, allowNull: false, required: true},
    title: {type: DataTypes.TEXT, allowNull: false, required: true},
    content: {type: DataTypes.TEXT, allowNull: false, required: true}
});

module.exports = Post;