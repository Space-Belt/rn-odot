import {atom, useRecoilState} from 'recoil';
import {ITodoItem} from '../types/todos';


export interface ITodoItemList {


  fullDate: string;
  todos: ITodoItem[];
}

const initialTodoState: ITodoItemList = {
  fullDate: '',
  todos: [],
};

export const todoList = atom({
  key: 'todoList',
  default: initialTodoState,
});

export const useTodoList = () => {
  const [todoItems, setTodoItems] = useRecoilState(todoList);

  const setTodos = (date: string, todo: ITodoItem[]) => {
    setTodoItems({
      fullDate: date,
      todos: todo,
    });
    console.log(todo);
  };

  return {todoItems, setTodos};
};
