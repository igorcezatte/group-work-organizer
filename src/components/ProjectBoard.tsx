import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { TASK_STATUS, useManageTasks } from 'src/hooks/useManageTasks';

import { FAKE_TASKS } from '../util/data';
import { ProjectBoardColumn } from './ProjectBoardColumn';
import { TaskItem } from './TaskItem';
import TaskList from './TaskList';

export function ProjectBoard({ tasks }) {
  const { tasksByStatus, drag } = useManageTasks(tasks);

  return (
    <DragDropContext onDragEnd={drag}>
      <Box
        display="flex"
        columnGap="2rem"
        padding="1rem"
        width="100%"
        flex={1}
        overflow="auto"
      >
        {TASK_STATUS.map((status) => (
          <ProjectBoardColumn key={status} dropId={status}>
            <TaskList>
              {tasksByStatus[status].map((task, index) => (
                <Draggable
                  key={task._id}
                  draggableId={task._id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Paper
                      sx={{ margin: '1rem' }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem task={task} />
                    </Paper>
                  )}
                </Draggable>
              ))}
            </TaskList>
          </ProjectBoardColumn>
        ))}
      </Box>
    </DragDropContext>
  );
}
