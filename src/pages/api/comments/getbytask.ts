import { ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query;

        if (!id) {
            res.status(400).json({ error: 'Missing project Id' });
            return;
        }

        const { db, client } = await connect();

        const task = await db.collection('tasks').findOne({ _id: new ObjectID(id) });

        const commentsTasks = task.comments;

        if (!commentsTasks) {
            client.close();
            res.status(200).json({});
            return;
        }

        const comments = await Promise.all(commentsTasks.map(async p => {
            return await db.collection('comments').findOne({ _id: new ObjectID(p) });
        }));

        client.close();
        res.status(200).json(comments);
    }
};