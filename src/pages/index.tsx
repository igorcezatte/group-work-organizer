import { Layout } from '@components/Layout';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import Login from './login';

export default function Home() {
  const [session] = useSession();

  return (
    <>
      {!session &&
        <Login />
      }
      {session &&
        <Layout>
          <Head>
            <title>Homepage - GW.Organizer</title>
          </Head>
          <Box>
            <Typography variant="h6">Home Page</Typography>
          </Box>
        </Layout>
      }
    </>
  );
}
