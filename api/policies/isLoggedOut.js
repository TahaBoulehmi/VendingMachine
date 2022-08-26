module.exports = async function (req, res, proceed) {
  return req.session.user ? res.status(403).json({}) : proceed()
}
