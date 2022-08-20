/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Passwords = require('machinepack-passwords')

module.exports = {
  signup: async function (req, res) {
    const createdUser = await User.create({
      username: req.param('username'),
      password: req.param('password'),
    })
      .intercept(err => {
        return res.serverError(err)
      })
      .fetch()
    if (createdUser) {
      req.session.user = createdUser
      return res.ok({ user: createdUser })
    }
  },

  signin: async function (req, res) {
    const user = await User.findOne({ username: req.param('username') }).intercept(err => {
      return res.serverError(err)
    })
    if (!user) {
      return res.notFound('User not found.')
    } else {
      Passwords.checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password,
      }).exec({
        error: function (err) {
          return res.serverError(err)
        },

        incorrect: function () {
          return res.badRequest('The password was wrong')
        },

        success: function () {
          req.session.user = user
          return res.ok()
        },
      })
    }
  },

  signout: function (req, res) {
    req.session.user = null
    return res.ok()
  },
}
