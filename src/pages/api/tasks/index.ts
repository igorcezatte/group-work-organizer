import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectID } from 'mongodb';
import connect from '../../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { title, email } = req.body;
        const { projectId } = req.query;

        if (!title || !email || !projectId) {
            res.status(400).json({ error: 'Missing body parameter' });
            return;
        }

        const { db } = await connect();

        const user = await db.collection('users').findOne({ email });

        if (!user) {
            res.status(400).json({ error: 'User id not found' });
            return;
        }

        const project = await db.collection('projects').findOne({ _id: new ObjectID(projectId) });

        if (!project) {
            res.status(400).json({ error: 'Project id not found' });
            return;
        }

        const task = await db.collection("tasks").insertOne({
            title,
            user: email,
            userName: user.name,
            userImage: user.image,
            projectId,
            status: 'todo',
            createdAt: Date.now()
        });

        await db.collection("projects").updateOne(
            { _id: new ObjectID(projectId) },
            { $push: { tasks: task.ops[0]._id.toString() } }
        );

        res.status(200).json(task.ops[0]);
    } else if (req.method === 'GET') {
        const { id } = req.query;

        if (!id) {
            res.status(400).json({ error: 'Missing id' });
            return;
        }

        const { db } = await connect();

        const task = await db.collection('tasks').findOne({ _id: new ObjectID(id) });

        if (!res) {
            res.status(400).json({ error: 'Id not found' });
        }

        res.status(200).json(task);
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { email, title, status } = req.body;

        if (!id) {
            res.status(400).json({ error: 'Missing id' });
            return;
        }

        const { db } = await connect();

        const task = await db.collection('tasks').findOne({ _id: new ObjectID(id) });
        
        if (email) {
            const user = await db.collection('users').findOne({ email });

            if (!user) {
                res.status(400).json({ error: 'Email not found' });
                return;
            };
        }

        if (!task) {
            res.status(400).json({ error: 'Task id not found' });
            return;
        };

        if (status) {
            await db.collection('tasks').updateOne(
                { _id: new ObjectID(id) },
                {
                    $set: { status }
                }
            );
        };
        if (title) {
            await db.collection('tasks').updateOne(
                { _id: new ObjectID(id) },
                {
                    $set: { title }
                }
            );
        };
        if (email) {
            await db.collection('tasks').updateOne(
                { _id: new ObjectID(id) },
                {
                    $set: { user: email }
                }
            );
        }


        const taskUpdated = await db.collection('tasks').findOne({ _id: new ObjectID(id) });

        res.status(200).json(taskUpdated);
    }
};