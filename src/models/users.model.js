'use strict'

require('dotenv').config();
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const UsersModel = (sequelize, DataTypes) => {

const Users = sequelize.define('user', {  // a define method to mappings between a model and a table . Sequelize will then automatically add 
                                         //the attributes createdAt and updatedAt
    username: {
        type: DataTypes.STRING,
        allowNull: false
        // unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role:{
        type: DataTypes.ENUM('admin', 'writer', 'editor', 'user'),
        defaultValue: 'user',

    },

    token :{
      type: DataTypes.VIRTUAL
    },

    actions: {
        type: DataTypes.VIRTUAL,
        get() {
            const acl = {
                user: ['read'],
                writer: ['read', 'create'],
                editor: ['read', 'create', 'update'],
                admin: ['read', 'create', 'update', 'delete'],
            }
            return acl[this.role];
        }
    }

});
Users.authenticateBasic = async function (username, password) {
    try {
      const user = await this.findOne({ where: { username } });
      const validUser = await bcrypt.compare(password, user.password);
      if (validUser) {
        const token = await JWT.sign(user.username, SECRET);
        user.token = token;
        return user;
      } else {
        return "Invalid User";
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  Users.validateToken = async function (token) {
    try {
      const username = await JWT.verify(token, SECRET);
      const user = await this.findOne({ where: { username } });
      if (user) return user;
      else return "Invalid Token";
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return Users;
};


module.exports = UsersModel;