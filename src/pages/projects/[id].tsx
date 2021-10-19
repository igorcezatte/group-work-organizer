import Head from 'next/head';
import { useRouter } from 'next/router'

import { ProjectBoard } from '@components/ProjectBoard';
import { Layout } from '@components/Layout';
import { useEffect, useState } from 'react';
import { api } from 'src/services/api';

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
  }, [id])

  return (
    <Layout>
      <Head>
        <title>Project - GW.Organizer</title>
      </Head>
      <ProjectBoard tasks={tasks} />
    </Layout>
  );
}
