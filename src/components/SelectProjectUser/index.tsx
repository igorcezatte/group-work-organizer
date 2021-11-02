import { useEffect, useState } from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  SelectProps,
  Avatar,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { api } from 'src/services/api';
import { useRouter } from 'next/router';

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}

export function SelectProjectUser(props: SelectProps) {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('idle');

  const { id } = router.query;

  useEffect(() => {
    async function getUsers() {
      setStatus('loading');
      const response = await api.get<User[]>('/users/getall', {
        params: { projectId: id },
      });

      setUsers(response.data);
      setStatus('resolved');
    }
    try {
      getUsers();
    } catch (err) {
      setStatus('error');
      console.log(err);
    }
  }, [id]);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Nome</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        {...props}
        input={<OutlinedInput label="Name" />}
        SelectDisplayProps={{
          style: {
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
          },
        }}
      >
        {status !== 'loading' ? (
          users.map((user) => (
            <MenuItem
              key={user.name}
              value={user._id}
              selected={props.value === user.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '1rem',
              }}
            >
              <Avatar alt={user.name} src={user.image} />
              <Typography>{user.name}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <CircularProgress sx={{ margin: '0 auto' }} size={16} />
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
