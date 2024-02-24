export interface TodoItem {
  todo: string;
  done: boolean;
}

export interface DayTodoList {
  [key: string]: TodoItem[];
}

export interface MonthTodoList {
  [key: string]: DayTodoList;
}

export interface YearTodoList {
  [key: string]: MonthTodoList;
}

export interface WholeTodoList {
  [year: string]: {
    [month: string]: {
      [date: string]: TodoItem[];
    };
  };
}

export interface TodoGroup {
  [key: string]: TodoList;
}

export interface TodoList {
  [key: string]: TodoItem[];
}
