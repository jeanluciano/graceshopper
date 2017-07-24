const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require("crypto");
const _ = require('lodash');

module.exports = db.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
   email: {
    type: Sequelize.STRING,
    isEmail: true,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING,
  }
},
{
  instanceMethods: {
    sanitize: function () {
      return _.omit(this.toJSON(), ['password', 'salt']);
    },
    correctPassword: function (candidatePassword) {
      return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
    }
  },
  classMethods: {
    generateSalt: function () {
      return crypto.randomBytes(16)
            .toString('hex') /** convert to hexadecimal format */
    },
    encryptPassword: function (plainText, salt) {
      const hash = crypto.createHash('sha1');
      hash.update(plainText);
      hash.update(salt);
      return hash.digest('hex');
     }
  },
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});

function setSaltAndPassword (user) {
  user.salt = user.Model.generateSalt();
  user.password = user.Model.encryptPassword(user.password, user.salt);
}