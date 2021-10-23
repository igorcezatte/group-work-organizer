import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Card, AvatarGroup, Avatar } from '@mui/material';
import { NavLink } from '@components/NavLink';
import { api } from 'src/services/api';
import { Box } from '@mui/system';
import { UserAvatar } from '@components/UserAvatar';

type ProjectItemProps = {
  project: {
    _id: string;
    title: string;
    ownerId: string;
    deadline: Date;
    course: string;
    status: string;
    users: string[];
  };
};

export function ProjectCard({ project }: ProjectItemProps) {
  const { users = [] } = project;
  return (
    <NavLink href={`/projects/${project._id}`} noUnderline>
      <Card
        sx={{ minWidth: 250, maxHeight: 130, margin: 1.5, cursor: 'pointer' }}
      >
        <CardActions>
          <CardContent>
            <Typography sx={{ mb: 2 }} variant="h5" component="div">
              {project.title}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                variant="body2"
              >
                Due date: {new Date(project.deadline).toLocaleDateString()}
              </Typography>
              <AvatarGroup>
                <UserAvatar userId={project.ownerId} />
                {users.map((userId) => (
                  <UserAvatar key={userId} userId={userId} />
                ))}
              </AvatarGroup>
            </Box>
          </CardContent>
        </CardActions>
      </Card>
    </NavLink>
  );
}
