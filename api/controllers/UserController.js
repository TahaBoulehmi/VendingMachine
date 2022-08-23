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
        return res.badRequest(err)
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
      return res.notFound({ message: 'User not found.' })
    } else {
      Passwords.checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password,
      }).exec({
        error: function (err) {
          return res.serverError(err)
        },

        incorrect: function () {
          return res.badRequest({ message: 'The password was wrong' })
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

  authenticate: async function (req, res) {
    if (req.session && req.session.user) {
      const user = await User.findOne(req.session.user.id).intercept(err => {
        return res.serverError(err)
      })
      if (!user) {
        return res.notFound({ message: 'User not found.' })
      } else {
        sails.sockets.join(req, req.session.user.id, err => {
          if (err) {
            return res.serverError(err)
          }
          req.session.user = user
          return res.ok(user)
        })
      }
    } else {
      return res.badRequest({})
    }
  },

  logoutAll: async function (req, res) {
    if (req.session && req.session.user) {
      const user = await User.findOne(req.session.user.id).intercept(err => {
        return res.serverError(err)
      })
      if (!user) {
        return res.notFound({ message: 'User not found.' })
      } else {
        sails.sockets.broadcast(String(req.session.user.id), 'logout')
        sails.sockets.removeRoomMembersFromRooms(
          String(req.session.user.id),
          String(req.session.user.id),
          err => {
            console.log('logout all', err)
            if (err) {
              return res.serverError(err)
            }
            return res.ok({})
          }
        )
      }
    } else {
      return res.badRequest({})
    }
  },

  fetchUser: async function (req, res) {
    if (req.session && req.session.user) {
      const user = await User.findOne(req.session.user.id).intercept(err => {
        return res.serverError(err)
      })
      if (!user) {
        return res.notFound({ message: 'User not found.' })
      } else {
        return res.ok({ user })
      }
    } else {
      return res.badRequest({})
    }
  },

  updateUser: async function (req, res) {
    const updatedUser = await User.updateOne({ id: req.session.user.id })
      .set({ username: req.param('username'), password: req.param('password') })
      .intercept(err => {
        return res.serverError(err)
      })

    return updatedUser ? res.ok({ user }) : res.notFound({})
  },

  deleteUser: async function (req, res) {
    await Product.destroy({
      seller: req.session.user.id,
    }).intercept(err => {
      return res.badRequest(err)
    })

    await User.destroy({
      id: req.session.user.id,
    }).intercept(err => {
      return res.badRequest(err)
    })
    req.session.user = null
    return res.ok({})
  },
}
