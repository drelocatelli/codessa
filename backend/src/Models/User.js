const {DataTypes} = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
    name: {type: DataTypes.STRING, required: true},
    password: {type: DataTypes.STRING, required: true},
    permissions: {type: DataTypes.STRING, defaultValue: `USER`}
});

module.exports = User;
