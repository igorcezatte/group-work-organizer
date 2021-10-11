import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToDo } from "../../../interfaces/ToDo";
import { Draggable } from "react-beautiful-dnd";

import styles from './styles.module.scss';

const SingleTodo: React.FC<{
  index: number;
  todo: ToDo;
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, title: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot) => (
          <form
            onSubmit={(e) => handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={styles.toDoSingle}
          >
            {todo.avatar ?
              <Image
                className={styles.avatar}
                alt="avatar"
                src={todo.avatar}
                width={65}
                height={65}
              />
              :
              null
            }
            {edit ? (
              <input
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                className="todos__single--text"
                ref={inputRef}
              />
            ) : todo.isDone ? (
              <s className="todos__single--text">{todo.title}</s>
            ) : (
              <span className="todos__single--text">{todo.title}</span>
            )}
            <div>
              <span
                className="icon"
                onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
              >
                <AiFillEdit />
              </span>
              <span className="icon" onClick={() => handleDelete(todo.id)}>
                <AiFillDelete />
              </span>
              <span className="icon" onClick={() => handleDone(todo.id)}>
                <span>Conclude Icon</span>
              </span>
            </div>
          </form>
        )}
      </Draggable>
    </>
  );
};

export default SingleTodo;