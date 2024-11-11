import { Schema, Document, model, models } from "mongoose";

// Define the Inventory document interface
export interface InventoryDocument extends Document {
  id: number;
  user_id: string;
  slot1: string;
  slot2: string;
  slot3: string;
}

// Define the Inventory schema
export const inventorySchema = new Schema<InventoryDocument>({
  id: { type: Number, required: true, unique: true },
  user_id: { type: String, required: true, ref: "User" }, // Reference to User
  slot1: { type: String, required: true },
  slot2: { type: String, required: true },
  slot3: { type: String, required: true },
});

// Export the Inventory model
export const inventoryModel =
  models.Inventory || model<InventoryDocument>("Inventory", inventorySchema);
