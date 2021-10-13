import { Layout } from '@components/Layout';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Head from 'next/head';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Homepage - GW.Organizer</title>
      </Head>
      <Box>
        <Typography variant="h6">Home Page</Typography>
      </Box>
    </Layout>
  );
}
