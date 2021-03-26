const jwt = require('jsonwebtoken')
//require('dotenv-safe').config()

function verifyToken() {
  return async (req, res, next) => {
    const token = req.headers["x-acess-token"]

    if (!token) {
      return res.status(401).json({ auth: false, message: "No token provided." })
    }

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res.status(500).json({ auth: false, message: "Failed to authenticate token.", err: err })
      } else {
        next();
      }
    })
  }
}

export default verifyToken