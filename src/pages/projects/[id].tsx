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

      const completeTask = await Promise.all(response.data.map(async task => {
        const res = await api.get<UserData>('/users', { params: { email: task.user }});
        task.userName = res.data.name;
        task.userImage =  res.data.image;
        return task;
      }));

      setTasks(completeTask);
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
