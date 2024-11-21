import { Schema, Document, model, models } from "mongoose";

// Define the Achievement document interface
export interface AchievementDocument extends Document {
  id: string;
  user_id: string;
  name: string;
  experience: number;
  dateCompleted: string;
}

// Define the Achievement schema
export const achievementSchema = new Schema<AchievementDocument>({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true, ref: "User" }, // Reference to User
  name: { type: String, required: true },
  experience: { type: Number, required: true },
  dateCompleted: { type: String, required: true },
});

// Export the Achievement model
export const achievementModel =
  models.Achievement ||
  model<AchievementDocument>("Achievement", achievementSchema);
