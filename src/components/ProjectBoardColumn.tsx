import { Paper, Typography, Box, Divider } from '@mui/material';
import { startCase } from 'lodash';
import { Droppable } from 'react-beautiful-dnd';

type ProjectBoardColumnProps = {
  children: React.ReactNode;
  dropId: string;
};

export function ProjectBoardColumn({
  children,
  dropId,
}: ProjectBoardColumnProps) {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography padding="1rem" variant="h6">
        {startCase(dropId)}
      </Typography>
      <Divider />
      <Droppable droppableId={dropId}>
        {(provided) => (
          <>
            <Box
              sx={{ width: 500, flex: 1 }}
              ref={provided.innerRef}
              {...provided.droppableProps}
              padding="1rem"
            >
              {children}
            </Box>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </Paper>
  );
}
