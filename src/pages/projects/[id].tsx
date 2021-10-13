import Head from 'next/head';

import { ProjectBoard } from '@components/ProjectBoard';
import { Layout } from '@components/Layout';

export default function ProjectPage() {
  return (
    <Layout>
      <Head>
        <title>Project - GW.Organizer</title>
      </Head>
      <ProjectBoard />
    </Layout>
  );
}
