import { ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { email } = req.query;

        if (!email) {
            res.status(400).json({ error: 'Missing e-mail' });
            return;
        }

        const { db, client } = await connect();

        const user = await db.collection('users').findOne({ email });
        const userId = user._id.toString();

        const pOwner = await db.collection('projects').find({ ownerId: userId }).toArray();
        const pParticipant = await db.collection('projects').find({ users: { $in: [userId] } }).toArray();
        const projects = pOwner.concat(pParticipant);

        client.close();
        res.status(200).json(projects);
    }
};