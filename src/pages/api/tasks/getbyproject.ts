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

        const { db } = await connect();

        const project = await db.collection('projects').findOne({ _id: new ObjectID(id) });

        const projectTasks = project.tasks;

        const tasks = await Promise.all(projectTasks.map(async p => {
            return await db.collection('tasks').findOne({ _id: new ObjectID(p) });
        }));
        
        res.status(200).json(tasks);
    }
};