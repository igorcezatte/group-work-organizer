import * as React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import { TaskModal } from './TaskModal';
import { Task } from 'src/types';

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src={task.userImage} alt="Ash Ketchun" />
      </ListItemAvatar>
      <ListItemText
        primary={task.title}
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {task.title ?? 'Description placeholder'}
          </Typography>
        }
      />
      <TaskModal task={task} />
    </ListItem>
  );
}
