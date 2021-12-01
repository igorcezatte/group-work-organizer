import * as React from 'react';
import { useRouter } from 'next/router';
import { api } from 'src/services/api';

import { useForm } from '@hooks/useForm';
import { useToggle } from '@hooks/useToggle';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

interface NewTaskFormValues {
  email: string;
  title: string;
  description: string;
}

async function createTask(
  projectId: string | string[],
  task: NewTaskFormValues,
  onCreateNewTask
) {
  const email = task.email;
  const title = task.title;
  const description = task.description;

  try {
    await api.post(`/tasks?projectId=${projectId}`, {
      email,
      title,
      description,
    });

    onCreateNewTask();
  } catch (err) {
    console.log(err);
  }
}

export function NewTaskModal({ onCreateNewTask }) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [open, { on: openAddNewUserForm, off: closeAddNewUserForm }] =
    useToggle(false);

  const { formValues, handleChange, onSubmit } = useForm<NewTaskFormValues>({
    initialValues: {
      email: '',
      title: '',
      description: '',
    },
  });
  const { id } = router.query;

  return (
    <Box>
      <Button
        color="secondary"
        variant="contained"
        onClick={openAddNewUserForm}
      >
        Adicionar nova tarefa
      </Button>
      <Dialog
        open={open}
        onClose={closeAddNewUserForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="button">Adicionar Nova Tarefa</Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            id="new-task-form"
            component="form"
            onSubmit={onSubmit(async (formValues) => {
              setLoading(true);
              await createTask(id, formValues, onCreateNewTask);
              closeAddNewUserForm();
              setLoading(false);
            })}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '1rem',
              padding: '1rem 0 ',
            }}
          >
            <Box sx={{ display: 'flex', columnGap: '1rem' }}>
              <TextField
                placeholder="Email"
                name="email"
                type="email"
                label="Email"
                value={formValues.email}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                placeholder="Título"
                name="title"
                type="text"
                label="Título"
                value={formValues.title}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              placeholder="Descrição"
              multiline
              fullWidth
              name="description"
              type="text"
              label="Descrição"
              value={formValues.description}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            form="new-task-form"
            variant="contained"
            onClick={closeAddNewUserForm}
          >
            Cancelar
          </Button>
          <Button type="submit" form="new-task-form" variant="contained" disabled={loading}>
            {loading ? "Adicionando..." : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
