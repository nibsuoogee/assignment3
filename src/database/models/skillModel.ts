import { Schema, Document, model, models } from "mongoose";

// Define the Skill document interface
export interface SkillDocument extends Document {
  name: string;
  user_id: string;
  skill1: string;
  skill2: string;
  skill3: string;
}

// Define the Skill schema
export const skillSchema = new Schema<SkillDocument>({
  name: { type: String, required: true },
  user_id: { type: String, required: true, unique: true, ref: "User" }, // Reference to User
  skill1: { type: String, required: true },
  skill2: { type: String, required: true },
  skill3: { type: String, required: true },
});

// Export the Skill model
export const skillModel =
  models.Skill || model<SkillDocument>("Skill", skillSchema);
