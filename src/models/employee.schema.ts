import mongoose, { Schema, Document } from "mongoose";

// Mongoose Document Interface
export interface EmployeeDocument extends Document {
  name: string;
  age: number;
  class: string;
  subjects: string[];
  attendance?: number;
}

// Mongoose Schema Definition
const EmployeeSchema = new Schema<EmployeeDocument>({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 65 },
  class: { type: String, required: true },
  subjects: { type: [String], required: true },
  attendance: { type: Number, default: 0, min: 0, max: 100 },
});

// Mongoose Model
export const EmployeeModel = mongoose.model<EmployeeDocument>("Employee", EmployeeSchema);
