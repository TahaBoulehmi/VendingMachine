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
  beforeCreate: function (values, proceed) {
    values.username ? (values.username = sails.helpers.format.with({ usernam: values.username })) : null
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
    values.username ? (values.username = sails.helpers.format.with({ usernam: values.username })) : null
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
}
