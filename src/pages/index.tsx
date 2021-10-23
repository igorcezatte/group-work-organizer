import { getSessionWithRedirect } from '@utils/auth';

export default function Home() {
  return null;
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
