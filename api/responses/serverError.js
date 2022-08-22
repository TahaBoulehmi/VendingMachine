/**
 * Module dependencies
 */
module.exports = function serverError(data) {
  var res = this.res

  data.message = data.details ? data.details : data.message
  return res.status(500).json({ ...data, message: data.details ? data.details : data.message })
}
