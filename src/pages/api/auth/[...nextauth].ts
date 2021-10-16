import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { signIn } from 'next-auth/client';
import Providers from 'next-auth/providers';
import connect from '../../../services/database';
// import GoogleProvider from `next-auth/providers/google`

// const options = {
//   providers: [
//     Providers.Auth0({
//       clientId: process.env.AUTH0_CLIENT_ID,
//       clientSecret: process.env.AUTH0_CLIENT_SECRET,
//       domain: process.env.AUTH0_DOMAIN,
//     }),
//   ],
// };

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const { id, email, name, image } = user;
      console.log(user);

      try {
        const { db } = await connect();
        const userDatabase = await db.collection('users').findOne({ email });
  
        if (userDatabase) {
          return true;
        }

        await db.collection("users").insertOne({
          googleId: id,
          name,
          email,
          image,
          projects: []
        });
      } catch (err) {
        console.log(err);
        return false
      }
    }
  }
});

//export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);