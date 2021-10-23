import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectID } from 'mongodb';
import connect from '../../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { title, ownerId, course, teacherName, deadline, users } = req.body;

        if (!title || !ownerId) {
            res.status(400).json({ error: 'Missing body parameter' });
            return;
        }

        const { db, client } = await connect();

        const owner = await db.collection('users').findOne({ _id: new ObjectID(ownerId) });

        if (!owner) {
            res.status(400).json({ error: 'Owner id not found' });
            return;
        }

        const project = await db.collection("projects").insertOne({
            title,
            ownerId,
            course,
            teacherName,
            deadline,
            users: [],
            tasks: [],
            createdAt: Date.now()
        });

        await db.collection("users").updateOne(
            { _id: new ObjectID(ownerId) },
            { $push: { projects: project.ops[0]._id.toString() } }
        );
        
        client.close();
        res.status(200).json(project.ops[0]);
    } else if (req.method === 'GET') {
        const { id } = req.query;

        if (!id) {
            res.status(400).json({ error: 'Missing id' });
            return;
        }

        const { db, client } = await connect();

        const project = await db.collection('projects').findOne({ _id: new ObjectID(id) });

        if (!res) {
            res.status(400).json({ error: 'Id not found' });
        }

        client.close();
        res.status(200).json(project);
    }
};