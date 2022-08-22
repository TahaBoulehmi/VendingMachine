const { exists } = require('grunt')

const returnedCoins = {
  friendlyName: 'Returned coins',

  description: 'Calculate the returned coins',

  inputs: {
    toReturn: {
      type: 'number',
      example: 60,
      description: 'Accepts only 5, 10, 20, 50, 100',
    },
  },
  acceptedCoins: [5, 10, 20, 50, 100],
  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs, exits) {
    return exits.success({
      100: Math.floor(inputs.toReturn / 100),
      50: Math.floor((inputs.toReturn % 100) / 50),
      20: Math.floor((inputs.toReturn % 50) / 20),
      10: Math.floor((inputs.toReturn % 20) / 10),
      5: Math.floor((inputs.toReturn % 10) / 5),
    })
  },
}
module.exports = returnedCoins
