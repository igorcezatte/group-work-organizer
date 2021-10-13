import { Layout } from '@components/Layout';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Head from 'next/head';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Projects - GW.Organizer</title>
      </Head>
      <Box>
        <Typography variant="h6">Projects Page</Typography>
      </Box>
    </Layout>
  );
}
