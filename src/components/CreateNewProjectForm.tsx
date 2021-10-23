import { useSession } from 'next-auth/client';
import { api } from 'src/services/api';

import { useForm } from '@hooks/useForm';
import {
  Button,
  Collapse,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box } from '@mui/system';
import { parseDate } from '@utils/date';
import { useToggle } from '@hooks/useToggle';

type CreateProjectFormValues = {
  title: string;
  teacherName: string;
  course: string;
  deadline: number | string;
};

async function createTask(ownerId: string, project: CreateProjectFormValues) {
  try {
    await api.post('/projects', { ownerId, ...project });
  } catch (err) {
    console.log(err);
  }
}

export function CreateNewProjectForm() {
  const { formValues, handleChange, onSubmit, setFieldValue } =
    useForm<CreateProjectFormValues>({
      initialValues: {
        title: '',
        teacherName: '',
        course: '',
        deadline: new Date().valueOf(),
      },
    });

  const [isIn, collapseHandlers] = useToggle(false);

  const [session] = useSession();

  return (
    <Paper
      component="form"
      onSubmit={onSubmit((formValues) => {
        createTask(session?.user?.id, formValues);
      })}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="h5" sx={{ padding: '1rem' }}>
          Create New Project
        </Typography>
        <IconButton onClick={collapseHandlers.toggle}>
          {isIn ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={isIn}>
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          columnGap="2rem"
          rowGap="2rem"
          padding="1rem"
        >
          <Box display="grid" rowGap="2rem">
            <TextField
              placeholder="Title"
              name="title"
              type="text"
              label="Título"
              value={formValues.title}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              placeholder="Course"
              name="course"
              type="text"
              label="Course"
              value={formValues.course}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box display="grid" rowGap="2rem">
            <TextField
              placeholder="Teacher Name"
              name="teacherName"
              type="text"
              label="Teacher Name"
              value={formValues.teacherName}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              placeholder="Deadline"
              name="deadline"
              type="date"
              label="Deadline"
              value={parseDate(formValues.deadline).inputFormat}
              onChange={(event) =>
                setFieldValue(
                  'deadline',
                  parseDate(event.currentTarget.value).valueOf
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Button type="submit" size="large" variant="contained">
            Create
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
}
