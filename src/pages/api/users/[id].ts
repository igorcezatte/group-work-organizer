import { ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/database';

export default async function userApiHandlers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ error: 'Missing id' });
      return;
    }

    const { db, client } = await connect();

    const user = await db.collection('users').findOne({
      _id: new ObjectID(id),
    });

    if (!res) {
      res.status(400).json({ error: 'E-mail not found' });
      return;
    }

    client.close();
    res.status(200).json(user);
  }
}
