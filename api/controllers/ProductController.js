/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  listProducts: async function (req, res) {
    const products = await Product.find()
      .select(['name', 'cost', 'amountAvailable'])
      .sort('creationDate DESC')
      .intercept(err => {
        return res.serverError(err)
      })

    return res.ok(products)
  },
  createProduct: async function (req, res) {
    const createdProduct = await Product.create({
      name: req.param('name'),
      cost: req.param('cost'),
      amountAvailable: req.param('amountAvailable'),
      seller: req.session.user.id,
    })
      .intercept(err => {
        console.log(err)
        return res.badRequest(err)
      })
      .fetch()
    return createdProduct ? res.ok(createdProduct) : null
  },
  updateProduct: async function (req, res) {
    const createdUser = await User.create({
      name: req.param('name'),
      cost: req.param('cost'),
      amountAvailable: req.param('amountAvailable'),
      seller: req.session.user.id,
    })
      .intercept(err => {
        return err.code === 'E_UNIQUE' ? res.smart('responses/409', 409, { email: false }) : res.serverError()
      })
      .fetch()
  },

  deleteProduct: async function (req, res) {
    return res.ok({})
  },
}
