import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Card, AvatarGroup, Avatar } from '@mui/material';
import { NavLink } from '@components/NavLink';
import { Box } from '@mui/system';
import { UserAvatar } from '@components/UserAvatar';
import { parseDate } from '@utils/date';

type ProjectItemProps = {
  project: {
    _id: string;
    title: string;
    ownerId: string;
    deadline: string;
    teacherName: string;
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
        elevation={0}
        sx={{
          width: '100%',
          cursor: 'pointer',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'secondary.main',
        }}
      >
        <CardActions>
          <CardContent sx={{ width: '100%' }}>
            <Typography variant="h5" component="div" gutterBottom>
              {project.title}
            </Typography>
            <Typography variant="subtitle1" component="div" gutterBottom>
              {project.course}
            </Typography>
            <Typography variant="subtitle2" component="div" gutterBottom>
              {project.teacherName}
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
                Data de entrega:{' '}
                {parseDate(project.deadline).date.toLocaleDateString}
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
