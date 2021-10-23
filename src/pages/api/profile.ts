import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { email } = req.query;

        if (!email) {
            res.status(400).json({ error: 'Missing id' });
            return;
        }

        const { db, client } = await connect();

        const user = await db.collection('users').findOne({ email });

        if (!res) {
            res.status(400).json({ error: 'Id not found' });
            return;
        }

        client.close();
        res.status(200).json(user);
    };
};