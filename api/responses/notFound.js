/**
 * Module dependencies
 */
module.exports = function notFound(data) {
  var res = this.res
  return res.status(404).json({ ...data, message: data.details ? data.details : data.message })
}
