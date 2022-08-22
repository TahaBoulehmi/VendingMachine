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
    const updatedProduct = await Product.updateOne({
      id: req.param('productId'),
      seller: req.session.user.id,
    })
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

  buyProduct: async function (req, res) {
    if (!(req.param('amount') > 0 && Math.floor(req.param('amount')) === +req.param('amount')))
      return res.badRequest({ message: 'The amount is not a valid number' })

    const product = await Product.findOne({ id: req.param('productId') }).intercept(err => {
      return res.serverError(err)
    })
    if (product) {
      if (product.amountAvailable >= req.param('amount')) {
        const user = await User.findOne({ id: req.session.user.id, role: 0 }).intercept(err => {
          return res.serverError(err)
        })
        if (user) {
          const price = product.cost * req.param('amount')
          if (price > user.deposit) return res.badRequest({ message: 'Not enough money' })
          const updatedProduct = await Product.updateOne(req.param('productId'))
            .set({
              amountAvailable: product.amountAvailable - req.param('amount'),
            })
            .intercept(err => {
              console.log(err)
              return res.badRequest(err)
            })
          if (updatedProduct) {
            const updatedUser = await User.updateOne({ id: req.session.user.id, role: 0 })
              .set({ deposit: 0 })
              .intercept(err => {
                return res.serverError(err)
              })
            if (updatedUser) {
              const returnedCoins = await sails.helpers.returnedCoins(user.deposit - price)
              return res.ok({ returnedCoins })
            }
            return res.serverError({})
          }
        }
      } else {
        return res.badRequest({ message: 'The products in stock are not enough' })
      }
    }
  },
}
