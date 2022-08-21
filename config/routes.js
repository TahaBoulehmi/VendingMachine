/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': function (req, res) {
    return res.ok({})
  },
  // AUTHENTICATION
  'POST /signup': 'UserController.signup',
  'PUT /signin': 'UserController.signin',
  'PUT /signout': 'UserController.signout',
  'GET /authenticate': 'UserController.authenticate',

  // MONEY
  'POST /deposit': 'DepositController.deposit',
  'POST /reset': 'DepositController.reset',

  // PRODUCTS
  'GET /products': 'ProductController.fetchProducts',
  'POST /products': 'ProductController.createProduct',
  'PUT /products': 'ProductController.updateProduct',
  'DELETE /products': 'ProductController.deleteProduct',

  // BUY
  'POST /buy': 'ProductController.buyProduct',

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
}
