module.exports = {
  friendlyName: 'Validate Deposit',

  description: 'Validate Deposit money.',

  acceptedCoints: [5, 10, 20, 50, 100],

  inputs: {
    deposit: {
      type: 'number',
      example: 5,
      description: 'Accepts only 5, 10, 20, 50, 100',
    },
  },

  exits: {
    success: {
      description: 'Your money was deposited successfully.',
    },
    error: {
      description: 'Only coins of 5, 10, 20, 50, 100 are accepted.',
    },
  },

  sync: true,

  fn: function (inputs, exits) {
    return acceptedCoints.contains(inputs.deposit) ? exits.success(true) : exits.error(false)
  },
}
