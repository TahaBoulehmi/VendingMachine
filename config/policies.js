/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,
  DepositController: {
    '*': ['isLoggedIn', 'isBuyer'],
  },
  UserController: {
    signup: ['isLoggedOut'],
    signin: ['isLoggedOut'],
    signout: ['isLoggedIn'],
    authenticate: ['isLoggedIn'],
    logoutAll: ['isLoggedIn'],
    fetchUser: ['isLoggedIn'],
    updateUser: ['isLoggedIn'],
    deleteUser: ['isLoggedIn'],
  },
  ProductController: {
    fetchProducts: ['isLoggedIn'],
    createProduct: ['isLoggedIn', 'isSeller'],
    updateProduct: ['isLoggedIn', 'isSeller'],
    deleteProduct: ['isLoggedIn', 'isSeller'],
    buyProduct: ['isLoggedIn', 'isBuyer'],
  },
}
