import { Model } from "mongoose";
import { UserDocument } from "./database/models/userModel";
import { InventoryDocument } from "./database/models/inventoryModel";
import { SkillDocument } from "./database/models/skillModel";
import { AchievementDocument } from "./database/models/achievementModel";

export type TableData<T> = {
  columnNames: Array<any>;
  rows: Array<Array<T[keyof T]>>;
};

export type DataWindowType = {
  title: string;
  rows: Array<Record<string, any>>;
};

export interface ModelsDictionary {
  userModel: Model<any>;
  inventoryModel: Model<any>;
  skillModel: Model<any>;
  achievementModel: Model<any>;
}
