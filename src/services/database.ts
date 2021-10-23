import { MongoClient, Db } from 'mongodb';

interface ConnectType {
    db: Db;
    client: MongoClient;
}

export default async function connect(): Promise<ConnectType> {
    const client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    if (!client.isConnected()) {
        await client.connect();
    };

    const db = client.db('unite');
    return { db, client };
}