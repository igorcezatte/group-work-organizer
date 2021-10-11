import { ToDo } from '../../../interfaces/ToDo';
import SingleTodo from "../SingleTodo";
import { Droppable } from "react-beautiful-dnd";

import styles from './styles.module.scss';

interface props {
    todos: ToDo[];
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
    CompletedTodos: ToDo[];
}

export function TodoList({todos, setTodos, CompletedTodos, setCompletedTodos}: props) {
    return (
        <div className={styles.listContainer}>
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div
                        className={styles.toDoArea}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className={styles.toDoTitle}>Active Tasks</span>
                        {todos?.map((ToDo, index) => (
                            <SingleTodo
                                index={index}
                                todos={todos}
                                todo={ToDo}
                                key={ToDo.id}
                                setTodos={setTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.completedArea}
                    >
                        <span className={styles.completedTitle}>Completed Tasks</span>
                        {CompletedTodos?.map((ToDo, index) => (
                            <SingleTodo
                                index={index}
                                todos={CompletedTodos}
                                todo={ToDo}
                                key={ToDo.id}
                                setTodos={setCompletedTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};