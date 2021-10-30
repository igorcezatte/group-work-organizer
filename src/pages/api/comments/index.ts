import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectID } from 'mongodb';
import connect from '../../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { description } = req.body;
        const { taskId, email } = req.query;

        if (!email || !taskId) {
            res.status(400).json({ error: 'Missing body parameter' });
            return;
        }

        const { db, client } = await connect();

        const user = await db.collection('users').findOne({ email });

        if (!user) {
            res.status(400).json({ error: 'User id not found' });
            return;
        }

        const task = await db.collection('tasks').findOne({ _id: new ObjectID(taskId) });

        if (!task) {
            res.status(400).json({ error: 'Project id not found' });
            return;
        }

        const comment = await db.collection("comments").insertOne({
            description,
            user: email,
            createdAt: Date.now()
        });

        await db.collection("tasks").updateOne(
            { _id: new ObjectID(taskId) },
            { $push: { comments: comment.ops[0]._id.toString() } }
        );

        client.close();
        res.status(200).json(comment.ops[0]);
    } else if (req.method === 'PUT') {
        const { id, email } = req.query;
        const { description } = req.body;

        if (!id) {
            res.status(400).json({ error: 'Missing id' });
            return;
        }

        const { db, client } = await connect();

        const comment = await db.collection('comments').findOne({ _id: new ObjectID(id) });
        
        if (email) {
            const user = await db.collection('users').findOne({ email });

            if (!user) {
                res.status(400).json({ error: 'Email not found' });
                return;
            };
        }

        if (!comment) {
            res.status(400).json({ error: 'Task id not found' });
            return;
        };
        
        if (description) {
            await db.collection('comments').updateOne(
                { _id: new ObjectID(id) },
                {
                    $set: { description }
                }
            );
        }

        const commentUpdated = await db.collection('comments').findOne({ _id: new ObjectID(id) });

        client.close();
        res.status(200).json(commentUpdated);
    }
};