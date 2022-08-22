/**
 * Module dependencies
 */
module.exports = function badRequest(data) {
  var res = this.res

  data.message = data.details ? data.details : data.message
  return res.status(400).json({ ...data, message: data.details ? data.details : data.message })
}
