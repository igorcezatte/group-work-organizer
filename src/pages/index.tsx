import { Layout } from '@components/Layout';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Session } from 'next-auth';
import Head from 'next/head';
import { getSessionWithRedirect } from '@utils/auth';
import { SignalWifiStatusbarNullTwoTone } from '@mui/icons-material';

type HomePageProps = { session: Session };

export default function Home({ session }: HomePageProps) {
  return SignalWifiStatusbarNullTwoTone;
}

export async function getServerSideProps(context) {
  await getSessionWithRedirect(context);
  return {
    redirect: {
      destination: '/projects',
      permanent: false,
    },
  };
}
