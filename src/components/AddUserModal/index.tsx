import { SelectProjectUser } from '@components/SelectProjectUser';
import { useForm } from '@hooks/useForm';
import { useToggle } from '@hooks/useToggle';
import { api } from 'src/services/api';
import * as React from 'react';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

type AddUserFormValues = {
  user: string;
};

async function addUser(projectId: string | string[], task: AddUserFormValues) {}

export function AddUserModal() {
  const router = useRouter();
  const [open, { on: openAddNewUserForm, off: closeAddNewUserForm }] =
    useToggle(false);

  const { formValues, setFieldValue, onSubmit } = useForm<AddUserFormValues>({
    initialValues: {
      user: '',
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
        Adicionar Participante
      </Button>
      <Dialog
        open={open}
        onClose={closeAddNewUserForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            minWidth: '400px',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="button">Adicionar Participante</Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            id="add-user-form"
            component="form"
            onSubmit={onSubmit(async (formValues) => {
              await addUser(id, formValues);
              closeAddNewUserForm();
            })}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '1rem',
              padding: '1rem 0 ',
            }}
          >
            <SelectProjectUser
              name="user"
              value={formValues.user}
              onChange={(event) =>
                setFieldValue('user', event.target.value as string)
              }
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
          <Button type="submit" form="add-user-form" variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
