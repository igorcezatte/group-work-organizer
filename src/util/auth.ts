import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/client';

export async function getSessionWithRedirect(
  context: GetServerSidePropsContext,
  { redirectPath = '/login' } = {}
) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: redirectPath,
        permanent: false,
      },
    };
  }

  return session;
}
