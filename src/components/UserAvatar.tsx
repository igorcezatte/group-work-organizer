import { Avatar } from '@mui/material';
import * as React from 'react';
import { api } from 'src/services/api';

type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

export function UserAvatar({ userId }) {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    (async function getUser() {
      try {
        const response = await api.get<User>(`/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (!user) return <Avatar />;

  return <Avatar alt={user.email} src={user.image} />;
}
