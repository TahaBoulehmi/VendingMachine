/**
 * DepositController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  deposit: async function (req, res) {
    try {
      sails.helpers.validateDeposit(req.param('deposit'))

      const user = await User.findOne({ id: req.session.user.id, role: 0 })
        .select(['deposit'])
        .intercept(err => {
          return res.serverError(err)
        })
      if (!user) return res.badRequest({})
      const updatedUser = await User.updateOne({ id: req.session.user.id, role: 0 })
        .set({ deposit: user.deposit + parseInt(req.param('deposit')) })
        .intercept(err => {
          return res.serverError(err)
        })

      return updatedUser ? res.ok({}) : res.notFound({})
    } catch (err) {
      return res.badRequest({ message: 'deposited coins were not valid' })
    }
  },
  reset: async function (req, res) {
    const updatedUser = await User.updateOne({ id: req.session.user.id, role: 0 })
      .set({ deposit: 0 })
      .intercept(err => {
        return res.serverError(err)
      })

    return updatedUser ? res.ok({}) : res.notFound({})
  },
}
