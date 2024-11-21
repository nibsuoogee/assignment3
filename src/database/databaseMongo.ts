import mongoose from "mongoose";
import { ModelsDictionary } from "../types";
import { userSchema } from "./models/userModel";
import { inventorySchema } from "./models/inventoryModel";
import { skillSchema } from "./models/skillModel";
import { achievementSchema } from "./models/achievementModel";

const connectionAddress = "mongodb://127.0.0.1:27017/test";
const conn = await mongoose.createConnection(connectionAddress).asPromise();

const userModel = conn.model("User", userSchema);
const inventoryModel = conn.model("Inventory", inventorySchema);
const skillModel = conn.model("Skill", skillSchema);
const achievementModel = conn.model("Achievement", achievementSchema);

const models: ModelsDictionary = {
  userModel,
  inventoryModel,
  skillModel,
  achievementModel,
};

export const modelMappings: { [key: string]: keyof ModelsDictionary } = {
  users: "userModel",
  inventories: "inventoryModel",
  skills: "skillModel",
  achievements: "achievementModel",
};

export async function findAllDocuments(modelName: keyof ModelsDictionary) {
  const model = models[modelName];

  if (!model) {
    throw new Error(`Model "${modelName}" not found.`);
  }

  const results = await model.find();
  return results;
}

export async function addDataToModel(
  modelName: keyof ModelsDictionary,
  data: any[]
) {
  const model = models[modelName];
  const filterKey =
    modelName === ("skillModel" as keyof ModelsDictionary) ? "name" : "id";
  const operations = data.map((item) => ({
    updateOne: {
      filter: { [filterKey]: item[filterKey] },
      update: { $set: item },
      upsert: true,
    },
  }));

  try {
    await model.bulkWrite(operations);
  } catch (error) {
    throw new Error(`Failed to insert data: ${error}`);
  }
}

export async function deleteAllDocuments(modelName: keyof ModelsDictionary) {
  try {
    const model = models[modelName];
    await model.deleteMany({});
  } catch (error) {
    throw new Error(`Failed to delete data: ${error}`);
  }
}

export async function dropCollections() {
  try {
    await Promise.all(
      Object.values(models).map(async (model) => {
        await model.collection.drop();
      })
    );
  } catch (error) {
    throw new Error(`Failed to drop collections: ${error}`);
  }
}
