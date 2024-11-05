export type TableData<T> = {
  columnNames: Array<any>;
  rows: Array<Array<T[keyof T]>>;
};

export type DataWindowType = {
  title: string;
  rows: Array<Record<string, any>>;
};
