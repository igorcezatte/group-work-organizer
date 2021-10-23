import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ProjectBoard } from '@components/ProjectBoard';
import { Layout } from '@components/Layout';
import Button from '@mui/material/Button';
import { api } from 'src/services/api';
import { Box } from '@mui/system';
import { NewTaskModal } from '@components/NewTaskModal';
import { getSessionWithRedirect } from '@utils/auth';
import { NavLink } from '@components/NavLink';

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
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const handleOpenNewTaskModal = () => setIsNewTaskOpen(true);
  const handleCloseNewTaskModal = () => setIsNewTaskOpen(false);

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
  }, [id, isNewTaskOpen]);

  return (
    <Layout>
      <Head>
        <title>Project - GW.Organizer</title>
      </Head>
      <Box>
        <NavLink href="/projects">
          <Button>Voltar</Button>
        </NavLink>
        <Box>
          <Button onClick={handleOpenNewTaskModal}>Criar nova Task</Button>
          <NewTaskModal
            isOpen={isNewTaskOpen}
            onRequestClose={handleCloseNewTaskModal}
          />
        </Box>
      </Box>
      <ProjectBoard tasks={tasks} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSessionWithRedirect(context);
  return {
    props: { session },
  };
}
