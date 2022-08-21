const validateDeposit = {
  friendlyName: 'Validate Deposit',

  description: 'Validate Deposit money.',

  acceptedCoins: [5, 10, 20, 50, 100],

  inputs: {
    deposit: {
      type: 'number',
      example: 5,
      description: 'Accepts only 5, 10, 20, 50, 100',
    },
  },

  exits: {
    success: {
      description: 'The coin you want to deposit is valid',
    },
    error: {
      description: 'Only coins of 5, 10, 20, 50, 100 are accepted.',
    },
  },

  sync: true,

  fn: function (inputs, exits) {
    return validateDeposit.acceptedCoins.includes(inputs.deposit) ? exits.success(true) : exits.error(false)
  },
}
module.exports = validateDeposit
