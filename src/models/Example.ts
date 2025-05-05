import mongoose, { Schema, Document, models, Model, Types } from 'mongoose';

// ממשק עבור נתוני דוגמה
export interface IExample extends Document {
  toolId: Types.ObjectId; // הפניה לכלי המשויך
  userId: string; // Clerk User ID של התורם
  title: string;
  linkToOutput?: string; // קישור לתוצר שהתקבל (אופציונלי)
  descriptionPrompt: string; // תיאור/פרומפט ששימש ליצירה
  credit?: string; // קרדיט ליוצר המקורי
  createdAt: Date;
  updatedAt: Date;
}

// סכמה עבור דוגמאות
const ExampleSchema = new Schema<IExample>(
  {
    toolId: { type: Schema.Types.ObjectId, ref: 'Tool', required: true, index: true }, // אינדקס לשליפה מהירה של דוגמאות לכלי
    userId: { type: String, required: true, index: true }, // אינדקס לשליפה מהירה של תרומות משתמש
    title: { type: String, required: true },
    linkToOutput: { type: String, required: false },
    descriptionPrompt: { type: String, required: true },
    credit: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

// יצירת המודל (אם לא קיים) והחזרתו
const Example: Model<IExample> = models.Example || mongoose.model<IExample>('Example', ExampleSchema);

export default Example; 