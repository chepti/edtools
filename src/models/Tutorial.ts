import mongoose, { Schema, Document, models } from 'mongoose';

export interface ITutorial extends Document {
  toolId: Schema.Types.ObjectId; // ID הכלי (מצביע ל-Tool)
  title: string; // כותרת ההדרכה
  format: 'video' | 'article' | 'pdf' | 'other'; // פורמט
  link: string; // קישור להדרכה
  additionalInfo?: string; // מידע נוסף
  creditCreator?: string; // קרדיט - מי היוצר?
  creditContributor?: string; // מי תרם למאגר
  rating?: number; // דירוג ההדרכה
}

const TutorialSchema: Schema = new Schema({
  toolId: { type: Schema.Types.ObjectId, ref: 'Tool', required: true },
  title: { type: String, required: true, trim: true },
  format: { type: String, enum: ['video', 'article', 'pdf', 'other'], required: true },
  link: { type: String, required: true, trim: true },
  additionalInfo: { type: String },
  creditCreator: { type: String },
  creditContributor: { type: String },
  rating: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

const Tutorial = models.Tutorial || mongoose.model<ITutorial>('Tutorial', TutorialSchema);

export default Tutorial; 