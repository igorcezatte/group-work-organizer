import { ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        const { id, destination } = req.body;

        if (!id) {
            res.status(400).json({ error: 'Missing id' });
            return;
        }

        const { db } = await connect();

        const task = await db.collection('tasks').findOne({ _id: new ObjectID(id) });

        if (!task) {
            res.status(400).json({ error: 'Task id not found' });
            return;
        };

        await db.collection('tasks').updateOne(
            { _id: new ObjectID(id) },
            {
                $set: { status: destination }
        });

        const taskUpdated = await db.collection('tasks').findOne({ _id: new ObjectID(id) });

        res.status(200).json(taskUpdated);
    }
};



