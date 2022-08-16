module.exports = {
  friendlyName: 'Format Helper',

  description: 'Format attributes entered by user.',

  inputs: {
    username: {
      type: 'string',
      example: 'btahadotcom',
      description: 'The username of the person',
    },
  },

  exits: {
    success: {
      description: 'Input is successfully formatted.',
    },
  },

  sync: true,

  fn: function (inputs, exits) {
    if (inputs.username) return exits.success(inputs.username.trim())
  },
}
