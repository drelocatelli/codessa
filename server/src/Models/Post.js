const {DataTypes} = require('sequelize');
const db = require('../db/conn');

const Post = db.define('Post', {
    user_id: {type: DataTypes.BIGINT, allowNull: false, required: true},
    title: {type: DataTypes.TEXT, allowNull: false, required: true},
    content: {type: DataTypes.TEXT, allowNull: false, required: true}
});

module.exports = Post;