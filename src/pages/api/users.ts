import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../services/database';


export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {
        const { email, name } = request.body;

        if (!email || !name) {
            response.status(400).json({ error: 'Missing body parameter' });
            return;
        }

        const { db } = await connect();

        const res = await db.collection("users").insertOne({
            name,
            email
        });

        response.status(200).json(res.ops[0]);
    } else {
        response.status(400).json({ error: 'Wrong request method' });
    }
};