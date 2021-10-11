import { useState } from 'react';
import { orderBy, range } from 'lodash';
import { resetServerContext, DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { GetServerSideProps } from "next";
import styles from './styles.module.scss';

import data from '../../../util/data';

interface Task {
    id: number;
    title: string;
    user: string;
    avatar: string;
    position: number;
};

export function Board() {
    const [toDos, setToDos] = useState<Task[]>(data);
    const [completedToDos, setCompletedToDos] = useState<Task[]>([]);

    const toDosRenderer = orderBy(toDos, "position").map((item) => (
        <Draggable
            draggableId={item.id.toString()}
            index={item.position}
            key={item.id}
        >
            {(provided) => (
                <div
                    className={styles.task}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div>
                        {item.id} - {item.title}
                    </div>
                    <div>
                        {item.avatar}
                    </div>
                    <div>
                        {item.user}
                    </div>
                </div>
            )}
        </Draggable>
    ));

    const completedRenderer = orderBy(completedToDos, "position").map((item) => (
        <Draggable
            draggableId={item.id.toString()}
            index={item.position}
            key={item.id}
        >
            {(provided) => (
                <div
                    className={styles.task}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <a>
                        Some Icon
                    </a>
                    <div>
                        {item.id} - {item.title}
                    </div>
                    <div>
                        {item.avatar}
                    </div>
                    <div>
                        {item.user}
                    </div>
                </div>
            )}
        </Draggable>
    ));

    const onDragEnd = (result: any) => {
        const { destination, source, draggableId } = result;
        let add;
        let active = toDos;
        let complete = completedToDos;

        let affectedRange: any[];

        if (!destination || !source) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (destination.droppableId === 'TODO') {
            console.log('UPDATE LISTA TODO');

            const directionDrag = destination.index > source.index ? "GREATER" : "LESS";

            if (directionDrag === "GREATER") {
                affectedRange = range(source.index, destination.index + 1);
            } else {
                affectedRange = range(destination.index, source.index);
            }

            const reOrdenedToDos = toDos.map((task) => {
                if (task.id === parseInt(draggableId)) {
                    task.position = result.destination.index;
                    return task;
                } else if (affectedRange.includes(task.position)) {
                    if (directionDrag === "GREATER") {
                        task.position = task.position - 1;
                        return task;
                    } else if (directionDrag === "LESS") {
                        task.position = task.position + 1;
                        return task;
                    }
                } else {
                    return task;
                }
            }
            );

            setToDos(reOrdenedToDos);
        } else if (destination.droppableId === 'DONE') {
            if (source.droppableId !== destination.droppableId) {
                console.log('remove from todo, add to completed');

                return;
            }

            console.log('UPDATE LISTA COMPLETED');
        }
    };

    return (
        <div className={styles.boardContainer}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.droppableContainer}>
                    <Droppable droppableId="TODO">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {toDosRenderer}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className={styles.droppableContainer}>
                    <Droppable droppableId="DONE">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {completedRenderer}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}

export const getStaticProps: GetServerSideProps = async () => {
    resetServerContext();

    return { props: { data } };
}