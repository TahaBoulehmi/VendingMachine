module.exports = async function (req, res, proceed) {
  if (req && req.session && req.session.user) {
    const user = await User.findOne({ id: req.session.user.id }).intercept(err => res.serverError(err))
    req.session.user = user
    return !user || user.role === 0 ? res.status(401) : proceed()
  } else {
    return res.status(401)
  }
}
