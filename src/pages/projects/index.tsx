import { useEffect, useState } from 'react';
import { Layout } from '@components/Layout';
import { getSession } from 'next-auth/client';
import { api } from '../../services/api';
import Head from 'next/head';
import { Button, Paper, Typography } from '@mui/material';

import { NewProjectModal } from '../../components/NewProjectModal';
import { ProjectCard } from '../../components/ProjectCard';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSessionWithRedirect } from '@utils/auth';
import { Box } from '@mui/system';
import { CreateNewProjectForm } from '@components/CreateNewProjectForm';
interface Project {
  _id: string;
  title: string;
  course: string;
  ownerId: string;
  deadline: Date;
  status: string;
}

const messages = {
  createNewProject: 'Create new project',
};

export default function Projects({ session }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const handleOpenNewProjectModal = () => setIsNewProjectOpen(true);
  const handleCloseNewProjectModal = () => setIsNewProjectOpen(false);

  useEffect(() => {
    async function getProjects() {
      const response = await api.get<Project[]>('/projects/getbyuser', {
        params: { email: session.user.email },
      });
      setProjects(response.data);
    }

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
      <Box display="flex" flexDirection="column" width="100%">
        {/* <Button onClick={handleOpenNewProjectModal}>
          {messages.createNewProject}
        </Button> */}
        {/* <NewProjectModal
          isOpen={isNewProjectOpen}
          onRequestClose={handleCloseNewProjectModal}
        /> */}
        <CreateNewProjectForm />
        <Paper sx={{ padding: '1rem', marginTop: '1rem' }}>
          <Typography variant="h5">Projects</Typography>
          {projects.map((project, idx) => (
            <ProjectCard project={project} key={project._id} />
          ))}
        </Paper>
      </Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSessionWithRedirect(context);

  return {
    props: { session },
  };
};
