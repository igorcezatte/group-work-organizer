import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

import { ProjectBoard } from '@components/ProjectBoard';
import { Layout } from '@components/Layout';
import Button from '@mui/material/Button';
import { api } from 'src/services/api';
import { Box } from '@mui/system';
import { NewTaskModal } from '@components/NewTaskModal';
import { AddUserModal } from '@components/AddUserModal';

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
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const handleOpenNewTaskModal = () => setIsNewTaskModalOpen(true);
  const handleCloseNewTaskModal = () => setIsNewTaskModalOpen(false);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const handleOpenAddUserModal = () => setIsAddUserModalOpen(true);
  const handleCloseAddUserModal = () => setIsAddUserModalOpen(false);

  const { id } = router.query

  useEffect(() => {
    async function getTasks() {
      if (!id) {
        return;
      }

      const response = await api.get<Task[]>('/tasks/getbyproject', { params: { id } });

      setTasks(response.data);
    };
    try {
      getTasks();
    } catch (err) {
      console.log(err);
    }
  }, [id, isNewTaskModalOpen])

  return (
    <Layout>
      <Head>
        <title>Project - GW.Organizer</title>
      </Head>
      <Box>
        <Link href={{
          pathname: `/projects/`
        }}>
          <Button>
            Voltar
          </Button>
        </Link>
        <Box>
          <Button onClick={handleOpenNewTaskModal}>
            Criar nova Task
          </Button>
          <NewTaskModal
            isOpen={isNewTaskModalOpen}
            onRequestClose={handleCloseNewTaskModal}
          />
        </Box>

        <Box>
          <Button onClick={handleOpenAddUserModal}>
            Adicionar participante
          </Button>
          <AddUserModal
            isOpen={isAddUserModalOpen}
            onRequestClose={handleCloseAddUserModal}
          />
        </Box>

        <ProjectBoard tasks={tasks} />
      </Box>
    </Layout>
  );
}
