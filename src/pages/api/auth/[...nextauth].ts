import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
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

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);