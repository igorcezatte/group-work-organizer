export type Project = {
  _id: string;
  title: string;
  ownerId: string;
  deadline: string;
  teacherName: string;
  course: string;
  status: string;
  users: string[];
};

export type Projects = Project[];

export const TASK_STATUS = [
  'todo',
  'in-progress',
  'blocked',
  'completed',
] as const;

export type TaskStatus = typeof TASK_STATUS[number];

export type Task = {
  _id: string;
  title: string;
  description?: string;
  user?: string;
  projectId: string;
  status: TaskStatus;
  userName: string;
  userImage: string;
};

export type Tasks = Task[];
