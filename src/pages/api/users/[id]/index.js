import { query as q } from 'faunadb';
import { serverClient } from '../../../../../utils/fauna-auth';
import verifyToken from '../../../../middlewares/verifyToken'
import nextConnect from 'next-connect'
const handler = nextConnect();

handler.get(verifyToken())
handler.get(async function(req, res, next) {
  const {
    query: { id },
  } = req;
  try {
    const user = await serverClient.query(
      q.Get(q.Ref(q.Collection('users'), id))
    );
    user.data.id = id
    return res.status(200).json(user.data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
})

export default handler;