/**
 * Module dependencies
 */
module.exports = function badRequest(data) {
  var res = this.res

  return res.status(400).json({ ...data, message: data.details ? data.details : data.message })
}
