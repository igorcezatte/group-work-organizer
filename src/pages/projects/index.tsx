import { useEffect, useState } from 'react';
import { Layout } from '@components/Layout';
import { getSession } from 'next-auth/client';
import { api } from '../../services/api';
import Head from 'next/head';
import { Button } from '@mui/material';

import { NewProjectModal } from '../../components/NewProjectModal';
import { ProjectCard } from '../../components/ProjectCard';
interface Project {
  _id: string;
  title: string;
  course: string;
  ownerId: string;
  deadline: Date;
  status: string;
}

export default function Projects({ session }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const handleOpenNewProjectModal = () => setIsNewProjectOpen(true);
  const handleCloseNewProjectModal = () => setIsNewProjectOpen(false);


  useEffect(() => {
    async function getProjects() {
      const response = await api.get<Project[]>('/projects/getbyuser', { params: { email: session.user.email } });
      setProjects(response.data);
    };

    try {
      getProjects();
    } catch (err) {
      console.log(err);
    }
  }, [session, isNewProjectOpen]);

  return (
    <Layout>
      <Head>
        <title>Projects - GW.Organizer</title>
      </Head>
      <div style={{ display: 'flex' }}>
        <Button onClick={handleOpenNewProjectModal}>
          Criar novo Projeto
        </Button>
        <NewProjectModal
            isOpen={isNewProjectOpen}
            onRequestClose={handleCloseNewProjectModal}
        />
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
  const session = await getSession(ctx);
  return ({ props: { session } });
}