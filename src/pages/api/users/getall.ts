import { ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { db, client } = await connect();
        const { projectId } = req.query;

        const allUsers = await db.collection('users').find().toArray();
        const project = await db.collection('projects').findOne({ _id: new ObjectID(projectId) });
        
        const usersIdString = allUsers.map(r => r._id.toString());

        const usersOutProject = usersIdString.filter(user => {
            if (project.users.includes(user) || project.ownerId === user) {
                return;
            }

            return user;
        });

        const users = await Promise.all(usersOutProject.map(async p => {
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