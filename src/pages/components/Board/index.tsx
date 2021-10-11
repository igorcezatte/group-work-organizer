import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
import { TodoList } from '../List';
import { InputField } from '../InputField';
import { ToDo } from '../../../interfaces/ToDo';

import tasks from '../../../util/data';


export function Board() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<ToDo[]>(tasks);
  const [CompletedTodos, setCompletedTodos] = useState<ToDo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos,
      { id: Date.now(), isDone: false, title: todo, 
        avatar: "https://avatars.githubusercontent.com/u/19882853?v=4", user: '', 
        position: 0 
      }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>TITULO</h1>
      <div className={styles.boardContainer}>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}