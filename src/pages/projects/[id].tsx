import Head from 'next/head';

import { ProjectBoard } from '@components/ProjectBoard';

export default function ProjectPage() {
  return (
    <>
      <Head>
        <title>Project - GW.Organizer</title>
      </Head>
      <ProjectBoard />
    </>
  );
}
