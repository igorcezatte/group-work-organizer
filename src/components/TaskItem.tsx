import * as React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Task } from 'src/hooks/useManageTasks';

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Ash Ketchun" />
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
    </ListItem>
  );
}
