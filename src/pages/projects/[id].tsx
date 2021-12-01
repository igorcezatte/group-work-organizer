import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from 'src/services/api';

import { AddUserModal } from '@components/AddUserModal';
import { Layout } from '@components/Layout';
import { NavLink } from '@components/NavLink';
import { NewTaskModal } from '@components/NewTaskModal';
import { ProjectBoard } from '@components/ProjectBoard';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { getProtectedServerSideProps } from '@utils/auth';

interface Task {
  user: string;
  title: string;
  status: string;
  userData: UserData;
  userName: string;
  userImage: string;
}

export interface UserData {
  name: string;
  image: string;
}

export default function ProjectPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  const { id } = router.query;

  useEffect(() => {
    async function getTasks() {
      if (!id) {
        return;
      }

      const response = await api.get<Task[]>('/tasks/getbyproject', {
        params: { id },
      });

      setTasks(response.data);
    }
    try {
      getTasks();
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  return (
    <Layout>
      <Head>
        <title>Project - Unit.e</title>
      </Head>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 1rem',
          }}
        >
          <NavLink href="/projects" noUnderline>
            <Button color="secondary" variant="contained">
              Voltar
            </Button>
          </NavLink>
          <Box sx={{ display: 'flex', columnGap: '1rem' }}>
            <NewTaskModal onCreateNewTask={() => {
              api.get<Task[]>('/tasks/getbyproject', {
                params: { id },
              }).then((response) => setTasks(response.data));
            }} />
            <AddUserModal />
          </Box>
        </Box>
        <ProjectBoard tasks={tasks} />
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
