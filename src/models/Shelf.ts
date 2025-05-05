import mongoose, { Schema, Document, models, Model, Types } from 'mongoose';

// ממשק עבור נתוני מדף כלים
export interface IShelf extends Document {
  userId: string; // Clerk User ID של יוצר המדף
  name: string;
  description?: string;
  tags?: string[];
  toolIds: Types.ObjectId[]; // מערך מזהי הכלים במדף
  followerIds: string[]; // מערך Clerk User IDs של העוקבים
  createdAt: Date;
  updatedAt: Date;
}

// סכמה עבור מדפי כלים
const ShelfSchema = new Schema<IShelf>(
  {
    userId: { type: String, required: true, index: true }, // אינדקס לשליפת מדפים של משתמש
    name: { type: String, required: true, index: true },
    description: { type: String, required: false },
    tags: { type: [String], default: [], index: true }, // אינדקס לסינון לפי תגיות
    toolIds: [{ type: Schema.Types.ObjectId, ref: 'Tool', default: [] }], // מערך הפניות לכלים
    followerIds: [{ type: String, default: [] }], // מערך הפניות למשתמשים (לפי Clerk ID)
  },
  {
    timestamps: true,
  }
);

// אינדקס טקסטואלי לחיפוש מדפים לפי שם ותיאור
ShelfSchema.index({ name: 'text', description: 'text', tags: 'text' });

// יצירת המודל (אם לא קיים) והחזרתו
const Shelf: Model<IShelf> = models.Shelf || mongoose.model<IShelf>('Shelf', ShelfSchema);

export default Shelf; 