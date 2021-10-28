import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { CreateNewProjectForm } from '@components/CreateNewProjectForm';
import { Layout } from '@components/Layout';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getProtectedServerSideProps } from '@utils/auth';

import { ProjectCard } from '../../components/ProjectCard';
import { api } from '../../services/api';

interface Project {
  _id: string;
  title: string;
  course: string;
  ownerId: string;
  teacherName: string;
  deadline: Date;
  status: string;
  users: string[];
}

export default function Projects({ session }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

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
      <Box display="flex" flexDirection="column" width="100%" height="100%">
        <CreateNewProjectForm />
        <Paper
          sx={{
            padding: '0 1rem 1rem 1rem',
            marginTop: '1rem',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
          }}
        >
          <Typography
            sx={{
              position: 'sticky',
              top: 0,
              right: 0,
              padding: '1rem 0',
              backgroundColor: 'background.paper',
              zIndex: 9999,
            }}
            variant="h5"
            gutterBottom
          >
            Projects
          </Typography>
          {projects.map((project, idx) => (
            <ProjectCard project={project} key={project._id} />
          ))}
        </Paper>
      </Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps =
  getProtectedServerSideProps(async (context) => {
    const session = await getSession(context);

    return {
      props: { session },
    };
  });
