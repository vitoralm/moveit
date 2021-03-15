import { query as q } from "faunadb"
import { serverClient } from "../../../../utils/fauna-auth"

export default async (req, res) => {
  if (req.method === "POST") {
    const {
      username,
      password,
      level,
      currentExperience,
      challengesCompleted,
    } = req.body

    try {
      await serverClient.query(
        q.Create(q.Collection("users"), {
          data: {
            username,
            password,
            level,
            currentExperience,
            challengesCompleted,
          }
        })
      )
      res.status(200).end()
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  } else {
      res.status(400).json( { message: 'invalid request'} )
  }
}
