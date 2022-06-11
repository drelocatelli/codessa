const {DataTypes} = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
    name: {type: DataTypes.STRING, allowNull:false, required: true},
    username: {type: DataTypes.STRING, allowNull:false, required: true, unique: true},
    password: {type: DataTypes.STRING, allowNull:false, required: true},
    permissions: {type: DataTypes.STRING, defaultValue: `USER`}
});

module.exports = User;
