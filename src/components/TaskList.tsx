import * as React from 'react';
import { List } from '@mui/material';

type TaskListProps = React.ComponentProps<typeof List>;

export default function TaskList({ children, ...props }: TaskListProps) {
  return <List {...props}>{children}</List>;
}
