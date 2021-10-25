import { ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query;

        if (!id) {
            res.status(400).json({ error: 'Missing id' });
            return;
        }

        const { db, client } = await connect();

        const project = await db.collection('projects').findOne({ _id: new ObjectID(id) });

        const users = await Promise.all(project.users.map(async p => {
            return await db.collection('users').findOne({ _id: new ObjectID(p) });
        }));

        if (!res) {
            res.status(400).json({ error: 'Id not found' });
            return;
        }

        client.close();
        res.status(200).json(users);
    };
};