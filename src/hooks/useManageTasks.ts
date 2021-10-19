import React, { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { api } from 'src/services/api';

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

type CreateTaskParam = Pick<Task, 'user' | 'title' | 'status' | 'projectId' | 'userName' | 'userImage'>;

export type Tasks = Task[];

type TasksByStatusLookup = Record<TaskStatus, Tasks>;

function createTask(task: CreateTaskParam): Task {
  return {
    _id: Date.now().valueOf().toString(),
    ...task,
  };
};

async function updateTask(id, destination) {
  await api.put('/tasks/movetask', { id, destination });
}

function createTaskByStatusLookup(tasks: Tasks) {
  const tasksByStatus = {} as TasksByStatusLookup;

  for (const status of TASK_STATUS) {
    tasksByStatus[status] = [];
  }

  for (const task of tasks) {
    tasksByStatus[task.status].push(task);
  }

  return tasksByStatus;
}

export function useManageTasks(taskList: Tasks = []) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

  const tasksByStatus = createTaskByStatusLookup(tasks);

  const edit = (id: string, editedTask: Partial<Task>) =>
    setTasks(($tasks) =>
      $tasks.map((task) => (task._id === id ? { ...task, ...editedTask } : task))
    );

  const remove = (id: string) =>
    setTasks(($tasks) => $tasks.filter((task) => task._id !== id));

  const add = (task: CreateTaskParam) =>
    setTasks(($tasks) => [createTask(task), ...$tasks]);

  const drag = ({ destination, source }: DropResult) => {
    /**
     * If it was dragged to a undropable zone
     * **/
    if (!destination) {
      return;
    }
    /**
     * If it was dragged to the same spot
     * **/
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    /**
     * If it was dragged to a different spot
     * **/
    setTasks(($tasks) => {
      const tasksStatus = createTaskByStatusLookup($tasks);

      const sourceId = source.droppableId as TaskStatus;
      const destinationId = destination.droppableId as TaskStatus;
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      /**
       * Find which task is being moved
       * **/
      const taskToMove = tasksStatus[sourceId]
        ? tasksStatus[sourceId].find((_, index) => index === sourceIndex)
        : null;
      /**
       * Remove task from board to start moving
       * **/
      tasksStatus[sourceId] = tasksStatus[sourceId]
        ? tasksStatus[sourceId].filter((_, index) => index !== sourceIndex)
        : [];

      /**
       * Insert taksk into new position on the board
       * **/
      tasksStatus[destinationId] = tasksStatus[destinationId] ?? [];
      tasksStatus[destinationId].splice(destinationIndex, 0, {
        ...taskToMove,
        status: destinationId,
      });
      /**
       * Transform back into a list
       * **/
      const newTasks = Object.values(tasksStatus).flat();

      try {
        updateTask(taskToMove._id, destinationId);
      } catch (err) {
        console.log(err);
      }

      return newTasks;
    });
  };

  return {
    tasks,
    tasksByStatus,
    edit,
    remove,
    add,
    drag,
  } as const;
}
