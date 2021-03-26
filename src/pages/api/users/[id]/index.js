import { query as q } from "faunadb"
import { serverClient } from "../../../../../utils/fauna-auth"
import verifyToken from "../../../../middlewares/verifyToken"
import nextConnect from "next-connect"
const handler = nextConnect()

handler.get(verifyToken())

handler.get(async function (req, res, next) {
  const {
    query: { id },
  } = req
  try {
    const user = await serverClient.query(
      q.Get(q.Ref(q.Collection("users"), id))
    )
    user.data.id = String(id)
    return res.status(200).json(user.data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

handler.post(verifyToken())
handler.post(async function (req, res) {
  const {
    query: { id },
  } = req
  const { body } = req
  try {
    const updatedUser = await serverClient.query(
      q.Update(q.Ref(q.Collection("users"), id), {
        data: {
          currentExperience: body.currentExperience,
          challengesCompleted: body.challengesCompleted,
          level: body.level,
        },
      })
    )
    updatedUser.data.id = String(id)
    return res.status(200).json(updatedUser.data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

export default handler
