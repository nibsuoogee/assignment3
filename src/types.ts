export type TableData<T> = {
  columnNames: Array<any>;
  rows: Array<Array<T[keyof T]>>;
};
