import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectID } from 'mongodb';
import connect from '../../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        const { id } = req.query;
        const { email } = req.body;

        if (!id) {
            res.status(400).json({ error: 'Missing id' });
            return;
        }

        const { db, client } = await connect();

        const project = await db.collection('projects').findOne({ _id: new ObjectID(id) });
        const user = await db.collection('users').findOne({ email });

        if (!project) {
            res.status(400).json({ error: 'Project id not found' });
            return;
        };
        if (!user) {
            res.status(400).json({ error: 'Email not found' });
            return;
        };

        const userId = user._id.toString();
        const projectId = project._id.toString();

        if (project.users.includes(userId) || project.ownerId === userId) {
            {
                res.status(400).json({ error: 'User is already part of the project' });
                return;
            }
        }

        await db.collection('projects').updateOne(
            { _id: new ObjectID(id) },
            {
                $push: { users: userId }
            });
        await db.collection("users").updateOne(
            { _id: new ObjectID(userId) },
            { $push: { projects: projectId } }
        );

        const projectUpdated = await db.collection('projects').findOne({ _id: new ObjectID(id) });

        client.close();
        res.status(200).json(projectUpdated);
    }
}