import NextAuth from 'next-auth';
import { session } from 'next-auth/client';
import Providers from 'next-auth/providers';
import connect from '../../../services/database';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const { id, email, name, image } = user;

      try {
        const { db } = await connect();
        const userDatabase = await db.collection('users').findOne({ email });

        if (userDatabase) {
          return true;
        }

        await db.collection('users').insertOne({
          googleId: id,
          name,
          email,
          image,
          projects: [],
        });
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async session(session) {
      if (!session.user?.email) return Promise.resolve(session);

      const { db } = await connect();

      const foundUser = await db
        .collection('users')
        .findOne({ email: session.user.email });

      return Promise.resolve({
        ...session,
        user: { ...session.user, id: foundUser._id },
      });
    },
  },
});
