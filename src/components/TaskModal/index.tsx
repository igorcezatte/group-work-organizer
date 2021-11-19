import * as React from 'react';
import { api } from 'src/services/api';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { useToggle } from '@hooks/useToggle';
import { CommentSection } from '@components/CommentSection';
import { useSession } from 'next-auth/client';
import { Project, Task } from 'src/types';
import { TaskInfoSection } from '@components/TaskInfoSection';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface Comment {
  _id: string;
  description: string;
  user: string;
  createdAt: string;
}

interface TaskModalProps {
  task: Task;
}

async function createComment({ comment, userId, taskId }) {
  const res = await api.post('/comments', {
    description: comment,
    userId,
    taskId,
  });
  return res.data;
}

function TaskContentLayout({ children, right, footer }) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: 1, display: 'flex' }}>
        <Box
          component="main"
          sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          {children}
        </Box>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '400px',
            maxWidth: '500px',
          }}
        >
          {right}
        </Box>
      </Box>
      <Box component="div">{footer}</Box>
    </Box>
  );
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export function TaskModal({ task }: TaskModalProps) {
  const [open, { on: openModal, off: closeModal }] = useToggle(false);

  const [comments, setComments] = React.useState<Comment[]>([]);
  const [session] = useSession();

  React.useEffect(() => {
    async function getComments() {
      if (!task._id) {
        return;
      }

      const response = await api.get<Comment[]>('/comments/getbytask', {
        params: { id: task._id },
      });

      setComments(response.data);
    }
    try {
      getComments();
    } catch (err) {
      console.log(err);
    }
  }, [task]);

  return (
    <div>
      <Button variant="outlined" onClick={openModal}>
        Detalhes
      </Button>
      <BootstrapDialog
        fullScreen
        onClose={closeModal}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={closeModal}>
          Modal title
        </BootstrapDialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column' }}
          dividers
        >
          <TaskContentLayout
            right={<TaskInfoSection task={task} />}
            footer={
              <CommentSection
                comments={comments}
                onSubmitComment={async ({ comment }) => {
                  const createdComment = await createComment({
                    comment,
                    taskId: task._id,
                    userId: session.user.id,
                  });

                  console.log(createdComment);
                }}
              />
            }
          >
            <Typography variant="h5" gutterBottom>
              {task.title}
            </Typography>
            <Divider />
            <Typography variant="subtitle1" gutterBottom>
              {task.description ?? 'Nenhuma descrição para a tarefa'}
            </Typography>
            <Typography gutterBottom>{task.status}</Typography>
          </TaskContentLayout>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
