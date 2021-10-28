import { GetServerSideProps } from 'next';

import { getProtectedServerSideProps } from '@utils/auth';

export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps =
  getProtectedServerSideProps(async () => {
    return {
      redirect: {
        destination: '/projects',
        permanent: false,
      },
    };
  });
