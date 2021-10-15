import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { email } = req.query;

        if (!email) {
            res.status(400).json({ error: 'Missing id' });
            return;
        }

        const { db } = await connect();

        const user = await db.collection('users').findOne({ email });

        if (!res) {
            res.status(400).json({ error: 'Id not found' });
            return;
        }

        res.status(200).json(user);
    };
};