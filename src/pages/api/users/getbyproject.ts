import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query;

        if (!id) {
            res.status(400).json({ error: 'Missing id' });
            return;
        }

        const { db } = await connect();

        const users = await db.collection('users').find({ projects: [id] }).toArray();

        if (!res) {
            res.status(400).json({ error: 'Id not found' });
            return;
        }

        res.status(200).json(users);
    };
};