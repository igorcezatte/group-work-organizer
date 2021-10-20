import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../services/database';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, name, image } = req.body;

        if (!email || !name) {
            res.status(400).json({ error: 'Missing body parameter' });
            return;
        }

        const { db } = await connect();

        const user = await db.collection('users').findOne({ email });

        if (user) {
            res.status(400).json({ error: 'Email already in use' });
            return;
        }

        const response = await db.collection("users").insertOne({
            name,
            email,
            image,
            projects: []
        });

        res.status(200).json(response.ops[0]);
    } else if (req.method === 'GET') {
        const { email } = req.query;

        if (!email) {
            res.status(400).json({ error: 'Missing e-mail' });
            return;
        }

        const { db } = await connect();

        const user = await db.collection('users').findOne({ email });

        if (!res) {
            res.status(400).json({ error: 'E-mail not found' });
            return;
        }

        res.status(200).json(user);
    }
};