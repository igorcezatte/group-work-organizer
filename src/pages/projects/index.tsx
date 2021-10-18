import { useEffect, useState } from 'react';
import { Layout } from '@components/Layout';
import { useSession, getSession } from 'next-auth/client';
import { api } from '../../services/api';
import Head from 'next/head';

import { ProjectCard } from '../../components/ProjectCard';
interface Project {
  id: string;
  name: string;
  course: string;
  ownerId: string;
  deadline: Date;
  status: string;
}

export default function Projects({session}) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function getProjects() {
      const response = await api.get<Project[]>('/projects/getbyuser', { params: { email: 'igorcezatte13@gmail.com' } });
      setProjects(response.data);
    };

    try {
      console.log(session);
      getProjects();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Projects - GW.Organizer</title>
      </Head>
      <div style={{ display: 'flex' }}>
        {projects.map((project, idx) =>
        (
          <ProjectCard project={project} key={idx} />
        ))
        }
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  return ({props: {session}})
}