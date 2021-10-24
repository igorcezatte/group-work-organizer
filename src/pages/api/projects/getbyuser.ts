import { ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { email } = req.query;

        if (!email) {
            res.status(400).json({ error: 'Missing e-mail' });
            return;
        }

        const { db, client } = await connect();

        const user = await db.collection('users').findOne({ email });
        const userId = user._id.toString();

        const p2 = await db.collection('projects').find({ owner: [user._id] });
        const projects = await db.collection('projects').find({ users: [userId] }).toArray();
        console.log('p2: ', p2);

        // if (!user.projects) {
        //     res.status(200);
        //     return;
        // }

        // const userProjects = user.projects;

        // const projects = await Promise.all(userProjects.map(async p => {
        //     return await db.collection('projects').findOne({ _id: new ObjectID(p) });
        // }));

        client.close();
        res.status(200).json(projects);
    }
};