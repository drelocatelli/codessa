const {DataTypes} = require('sequelize');
const db = require('../db/conn');
const User = require('./User');

const Post = db.define('Post', {
    title: {type: DataTypes.TEXT, allowNull: false, required: true},
    content: {type: DataTypes.TEXT, allowNull: false, required: true}
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = Post;