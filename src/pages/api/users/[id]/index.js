import { query as q } from 'faunadb';
import { serverClient } from '../../../../../utils/fauna-auth';
require('dotenv-safe').config()
const jwt = require('jsonwebtoken')

async function handler (req, res) {

  // transtormar no middleware
  const token = req.headers['x-acess-token'];
  if (!token) return res.status(401).json({auth: false, message: 'No token provided.'})

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.', err: err });
    
  })
  // transtormar no middleware
  
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
}

export default handler