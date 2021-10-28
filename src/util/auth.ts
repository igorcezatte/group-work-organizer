import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

export function getProtectedServerSideProps(
  asyncFn?: GetServerSideProps
): GetServerSideProps {
  return async (context, ...rest) => {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return await asyncFn(context, ...rest);
  };
}
