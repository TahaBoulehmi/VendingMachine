/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fetchProducts: async function (req, res) {
    const products = await Product.find(req.session.user.role === 1 ? { seller: req.session.user.id } : null)
      .select(['name', 'cost', 'amountAvailable'])
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
    const updatedProduct = await Product.update({ id: req.param('productId'), seller: req.session.user.id })
      .set({
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
    return updatedProduct ? res.ok(updatedProduct) : null
  },

  deleteProduct: async function (req, res) {
    const deletedProduct = await Product.destroy({
      id: req.param('productId'),
      seller: req.session.user.id,
    })
      .intercept(err => {
        console.log(err)
        return res.badRequest(err)
      })
      .fetch()
    return deletedProduct ? res.ok(deletedProduct) : null
  },
}
