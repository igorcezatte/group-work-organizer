import { useEffect, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
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
    name: string;
    email: string;
    image: string;
}

export function SelectProjectUser() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const theme = useTheme();
    const [personName, setPersonName] = useState('');

    const { id } = router.query;

    useEffect(() => {
        async function getUsers() {
            const response = await api.get<User[]>('/users/getall', { params: { projectId: id } });

            setUsers(response.data);
        };
        try {
            getUsers();
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Nome</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
            >
                {users.map((user) => (
                    <MenuItem
                        key={user.name}
                        value={user.email}
                        style={getStyles(name, personName, theme)}
                    >
                        {user.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}