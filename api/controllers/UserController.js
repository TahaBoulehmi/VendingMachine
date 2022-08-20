/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Passwords = require('machinepack-passwords')

module.exports = {
  signup: async function (req, res) {
    const user = await User.create({
      username: req.param('username'),
      password: req.param('password'),
      role: req.param('role'),
    })
      .intercept(err => {
        return res.serverError(err)
      })
      .fetch()
    if (user) {
      req.session.user = user
      return res.ok({ user })
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
          return res.ok({ user })
        },
      })
    }
  },

  signout: function (req, res) {
    req.session.user = null
    return res.ok({})
  },
}
