/**
 * DepositController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  deposit: async function (req, res) {
    console.log(req.session.user)
    const validateDeposit = sails.helpers.validateDeposit(req.param('deposit'))

    if (validateDeposit) {
      const user = await User.findOne({ id: req.session.user.id, role: 0 })
        .select(['deposit'])
        .intercept(err => {
          return res.serverError(err)
        })
      if (!user) return res.notFound()
      const updatedUser = await User.updateOne({ id: req.session.user.id, role: 0 })
        .set({ deposit: user.deposit + req.param('deposit') })
        .intercept(err => {
          return res.serverError(err)
        })

      return updatedUser ? res.ok({}) : res.notFound({})
    } else {
      return res.badRequest()
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
