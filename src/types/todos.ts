export interface IITodoItem {
  todo: string;
  done: boolean;
}

export interface IDayTodoList {
  [key: string]: ITodoItem[];
}

export interface IMonthTodoList {
  [key: string]: DayTodoList;
}

export interface IYearTodoList {
  [key: string]: MonthTodoList;
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
