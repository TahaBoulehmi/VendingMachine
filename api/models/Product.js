/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      isNotEmptyString: true,
    },
    cost: {
      type: 'number',
      required: true,
      min: 5,
      isInteger: true,
      custom: function (value) {
        return value % 5 === 0
      },
    },
    amountAvailable: {
      type: 'number',
      required: true,
      isInteger: true,
      min: 0,
    },
    seller: {
      model: 'user',
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
  afterCreate: function (values, proceed) {
    sails.sockets.blast('product', { status: 'create', product: values })
    return proceed()
  },

  afterUpdate: function (values, proceed) {
    sails.sockets.blast('product', { status: 'update', product: values })
    return proceed()
  },
  afterDestroy: function (values, proceed) {
    sails.sockets.blast('product', { status: 'delete', product: values })
    return proceed()
  },
}
