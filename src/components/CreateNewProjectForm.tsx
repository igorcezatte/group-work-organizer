import { useForm } from '@hooks/useForm';
import { Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

function parseDate(valueOfDate: number | string) {
  return {
    inputFormat: new Date(valueOfDate).toISOString().split('T')[0],
    valueOf: new Date(valueOfDate).valueOf(),
  };
}

export function CreateNewProjectForm() {
  const { formValues, handleChange, onSubmit, setFieldValue } = useForm({
    initialValues: {
      title: '',
      teacherName: '',
      course: '',
      deadline: new Date().valueOf(),
    },
  });

  return (
    <Paper
      component="form"
      onSubmit={onSubmit((formValues) => {
        console.log(formValues);
      })}
    >
      <Typography variant="h5" sx={{ padding: '1rem' }}>
        Create New Project
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        columnGap="2rem"
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
      </Box>
    </Paper>
  );
}
