const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const User = require('./User');

const Pages = db.define('Pages', {
    title: {type: DataTypes.STRING, allowNull:false, required: true},
    content: {type: DataTypes.TEXT, allowNull: false, required: true}
});

Pages.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = Pages;