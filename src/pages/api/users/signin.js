import { query as q } from "faunadb"
import { serverClient } from "../../../../utils/fauna-auth"
import nextConnect from 'next-connect'
//require("dotenv-safe").config()
const jwt = require("jsonwebtoken")
const handler = nextConnect();

handler.post(async function (req, res) {
    const {
      body: { username, password },
    } = req
    try {
      const user = await serverClient.query(
        q.Get(q.Match(q.Index("all_users"), username))
      )

      if (username === user.data.username && password === user.data.password) {
        const token = jwt.sign(user.data, process.env.SECRET, {
          expiresIn: 86400, // 1 dia
        })
        user.data.id = user.ref.id
        res.status(200).json({ auth: true, user: user, token: token })
      } else {
        res.status(401).json({ message: "Invalid username or password" })
      }
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
})


export default handler