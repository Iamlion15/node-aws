

exports.read = (req, res) => {
    req.profile.salt = undefined;
    req.profile.hashed_password = undefined
    res.json(req.profile)
}