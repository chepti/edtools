import mongoose, { Schema, Document, models } from 'mongoose';

export interface IExample extends Document {
  toolId: Schema.Types.ObjectId; // ID הכלי (מצביע ל-Tool)
  linkToProduct?: string; // קישור לתוצר
  title: string; // כותרת
  descriptionOrPrompt: string; // תיאור/פרומפט/מידע
  creditCreator?: string; // קרדיט - מי היוצר?
  creditContributor?: string; // מי תרם למאגר
  rating?: number; // דירוג
}

const ExampleSchema: Schema = new Schema({
  toolId: { type: Schema.Types.ObjectId, ref: 'Tool', required: true },
  linkToProduct: { type: String, trim: true },
  title: { type: String, required: true, trim: true },
  descriptionOrPrompt: { type: String, required: true },
  creditCreator: { type: String },
  creditContributor: { type: String },
  rating: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

const Example = models.Example || mongoose.model<IExample>('Example', ExampleSchema);

export default Example; 