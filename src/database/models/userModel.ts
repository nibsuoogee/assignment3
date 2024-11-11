import { Schema, Document, model, models } from "mongoose";

// Define the User document interface
export interface UserDocument extends Document {
  id: string;
  name: string;
  level: number;
  creationDate: Date;
  nationality: string;
}

// Define the User schema
export const userSchema = new Schema<UserDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  nationality: { type: String, required: true },
});

// Export the User model
export const userModel = models.User || model<UserDocument>("User", userSchema);
