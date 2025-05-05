import mongoose, { Schema, Document, models, Model, Types } from 'mongoose';

// ממשק עבור נתוני הדרכה
export interface ITutorial extends Document {
  toolId: Types.ObjectId; // הפניה לכלי המשויך
  userId: string; // Clerk User ID של התורם
  title: string;
  format: string; // פורמט (וידאו, מאמר, מצגת...)
  link: string; // קישור להדרכה
  additionalInfo?: string;
  credit?: string; // קרדיט ליוצר המקורי
  createdAt: Date;
  updatedAt: Date;
}

// סכמה עבור הדרכות
const TutorialSchema = new Schema<ITutorial>(
  {
    toolId: { type: Schema.Types.ObjectId, ref: 'Tool', required: true, index: true }, // אינדקס לשליפה מהירה של הדרכות לכלי
    userId: { type: String, required: true, index: true }, // אינדקס לשליפה מהירה של תרומות משתמש
    title: { type: String, required: true },
    format: { type: String, required: true },
    link: { type: String, required: true },
    additionalInfo: { type: String, required: false },
    credit: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

// יצירת המודל (אם לא קיים) והחזרתו
const Tutorial: Model<ITutorial> = models.Tutorial || mongoose.model<ITutorial>('Tutorial', TutorialSchema);

export default Tutorial; 