import { useForm } from '@hooks/useForm';
import { Paper, TextField, Button, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { api } from 'src/services/api';
import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

interface User {
  _id: string;
}

interface NewProjectFormValues {
  title: string;
  deadline: number | string;
}

interface NewProjectModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewProjectModal({
  isOpen,
  onRequestClose,
}: NewProjectModalProps) {
  const [session] = useSession();
  const [userId, setUserId] = useState('');
  const { formValues, handleChange, onSubmit, setFieldValue } =
    useForm<NewProjectFormValues>({
      initialValues: {
        title: '',
        deadline: new Date().valueOf(),
      },
    });

  useEffect(() => {
    async function getUserId() {
      const response = await api.get<User>('/users/', {
        params: { email: session.user?.email },
      });

      setUserId(response.data._id);
    }

    try {
      getUserId();
    } catch (err) {
      console.log(err);
    }
  }, [session]);

  async function CreateTask(project: NewProjectFormValues) {
    const title = project.title;
    const deadline = project.deadline;

    try {
      await api.post('/projects', { ownerId: userId, title, deadline });
      onRequestClose();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Paper
          component="form"
          onSubmit={onSubmit((formValues) => {
            CreateTask(formValues);
          })}
        >
          <h2>Criar novo Projeto</h2>

          <TextField
            placeholder="Título"
            name="title"
            type="title"
            label="Título"
            value={formValues.title}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            placeholder="Data de entrega"
            name="deadline"
            type="date"
            label="Data de entrega"
            value={new Date(formValues.deadline).toISOString().split('T')[0]}
            onChange={(event) =>
              setFieldValue(
                'deadline',
                new Date(event.currentTarget.value).valueOf()
              )
            }
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button type="submit" variant="contained">
            Criar
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
}
