import { Model } from "mongoose";

export type TableData<T> = {
  columnNames: Array<any>;
  rows: Array<Array<T[keyof T]>>;
};

export type DataWindowType = {
  databaseName: string;
  tableName: string;
  rows: Array<Record<string, any>>;
};

export interface ModelsDictionary {
  userModel: Model<any>;
  inventoryModel: Model<any>;
  skillModel: Model<any>;
  achievementModel: Model<any>;
}
