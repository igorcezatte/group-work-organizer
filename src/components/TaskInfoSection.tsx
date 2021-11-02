import { Avatar, Box, Divider, Typography } from '@mui/material';
import { parseDate } from '@utils/date';
import { Project, Task } from 'src/types';

type TaskInfoSectionProps = {
  task: Task;
};

export function TaskInfoSection({ task }: TaskInfoSectionProps) {
  return (
    <Box
      sx={{
        flex: 1,
        borderLeftColor: 'grey.400',
        borderLeftWidth: '1px',
        borderLeftStyle: 'solid',
        padding: '0 1rem',
      }}
    >
      <Typography>{task.title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={task.userName} src={task.userImage} />
        <Typography>Aluno: {task.userName}</Typography>
      </Box>
    </Box>
  );
}
