/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const Passwords = require('machinepack-passwords')

module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 25,
      isNotEmptyString: true,
    },
    password: {
      type: 'string',
      required: true,
      isNotEmptyString: true,
    },
    deposit: {
      type: 'number',
      defaultsTo: 0,
      min: 0,
    },
    role: {
      type: 'number',
      isIn: [0, 1], //0: buyer, 1: seller
      defaultsTo: 0,
    },
    products: {
      collection: 'product',
      via: 'seller',
    },

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  },
  customToJSON: function () {
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(this, ['password', 'products'])
  },
  beforeCreate: function (values, proceed) {
    values.username ? (values.username = sails.helpers.format.with({ username: values.username })) : null
    if (values.password) {
      Passwords.encryptPassword({
        password: values.password,
      }).exec({
        error: function () {
          values.password = undefined
          return proceed()
        },
        success: function (encPass) {
          values.password = encPass
          return proceed()
        },
      })
    } else {
      return proceed()
    }
  },

  beforeUpdate: function (values, proceed) {
    values.username ? (values.username = sails.helpers.format.with({ username: values.username })) : null
    if (values.password) {
      Passwords.encryptPassword({
        password: values.password,
      }).exec({
        error: function () {
          values.password = undefined
          return proceed()
        },

        success: function (encPass) {
          values.password = encPass
          return proceed()
        },
      })
    } else {
      return proceed()
    }
  },

  afterCreate: function (values, proceed) {
    sails.sockets.broadcast(values.id, 'userinfo', values)
    return proceed()
  },

  afterUpdate: function (values, proceed) {
    sails.sockets.broadcast(values.id, 'userinfo', values)
    return proceed()
  },

  afterDestroy: function (values, proceed) {
    sails.sockets.broadcast(values.id, 'userinfo', values)
    return proceed()
  },
}
