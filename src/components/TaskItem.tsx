import * as React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import { Task } from 'src/hooks/useManageTasks';
import { TaskModal } from './TaskModal';

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);
  const handleOpenTaskModal = () => setIsTaskModalOpen(true);
  const handleCloseTaskModal = () => setIsTaskModalOpen(false);

  return (
    <ListItem alignItems="flex-start">
      <Button onClick={handleOpenTaskModal} variant="contained">Editar</Button>
      <TaskModal
        isOpen={isTaskModalOpen}
        onRequestClose={handleCloseTaskModal}
        task={task}
      />
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
    </ListItem>
  );
}
