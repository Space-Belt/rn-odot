export interface ITodoItem {
  todo: string;
  done: boolean;
}

export interface IDayTodoList {
  [key: string]: ITodoItem[];
}

export interface IMonthTodoList {
  [key: string]: IDayTodoList;
}

export interface IYearTodoList {
  [key: string]: IMonthTodoList;
}

export interface IWholeTodoList {
  [year: string]: {
    [month: string]: {
      [date: string]: ITodoItem[];
    };
  };
}

export interface TodoGroup {
  [key: string]: ITodoList;
}

export interface ITodoList {
  [key: string]: ITodoItem[];
}

export interface Item {
  id: number;
  title: string;
  date: string;
}

export interface IItemType {
  count: string;
  fullDate: string;
  todos: ITodoItem[];
}

export interface SectionType {
  title: string;
  data: IItemType[];
}
