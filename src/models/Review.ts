import mongoose, { Schema, Document, models, Model, Types } from 'mongoose';

// ממשק עבור נתוני סקירה
export interface IReview extends Document {
  toolId: Types.ObjectId; // הפניה לכלי הנסקר
  userId: string; // Clerk User ID של כותב הסקירה
  title?: string; // כותרת הסקירה (אופציונלי)
  body: string; // גוף הסקירה
  credit?: string; // קרדיט אם רלוונטי
  createdAt: Date;
  updatedAt: Date;
}

// סכמה עבור סקירות
const ReviewSchema = new Schema<IReview>(
  {
    toolId: { type: Schema.Types.ObjectId, ref: 'Tool', required: true, index: true }, // אינדקס לשליפה מהירה של סקירות לכלי
    userId: { type: String, required: true, index: true }, // אינדקס לשליפה מהירה של תרומות משתמש
    title: { type: String, required: false },
    body: { type: String, required: true },
    credit: { type: String, required: false },
    // שימו לב: לא הוגדר דירוג לסקירות עצמן במסמכים המקוריים.
    // אם רוצים דירוג גם לסקירות, צריך להוסיף כאן שדה score
    // וליצור מודל נפרד ReviewRating או לשלב במודל Rating הקיים.
  },
  {
    timestamps: true,
  }
);

// יצירת המודל (אם לא קיים) והחזרתו
const Review: Model<IReview> = models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review; 