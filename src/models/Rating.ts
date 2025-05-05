import mongoose, { Schema, Document, models, Model, Types } from 'mongoose';

// סוגי פריטים שניתן לדרג
export type RateableType = 'Tool' | 'Tutorial' | 'Example';

// ממשק עבור הנתונים של דירוג
export interface IRating extends Document {
  userId: string; // Clerk User ID של המדרג
  ratedItemId: Types.ObjectId; // מזהה הפריט המדורג
  ratedItemType: RateableType; // סוג הפריט המדורג
  score: number; // הדירוג (למשל 1-5)
  createdAt: Date;
  updatedAt: Date;
}

// סכמה עבור דירוגים
const RatingSchema = new Schema<IRating>(
  {
    userId: { type: String, required: true },
    ratedItemId: { type: Schema.Types.ObjectId, required: true },
    ratedItemType: {
      type: String,
      required: true,
      enum: ['Tool', 'Tutorial', 'Example'],
    },
    score: { type: Number, required: true, min: 1, max: 5 },
  },
  {
    timestamps: true,
  }
);

// מפתח ייחודי משולב למניעת דירוג כפול מאותו משתמש לאותו פריט
RatingSchema.index({ userId: 1, ratedItemId: 1, ratedItemType: 1 }, { unique: true });
// אינדקס לחיפוש כל הדירוגים לפריט מסוים
RatingSchema.index({ ratedItemId: 1, ratedItemType: 1 });

// יצירת המודל (אם לא קיים) והחזרתו
const Rating: Model<IRating> = models.Rating || mongoose.model<IRating>('Rating', RatingSchema);

export default Rating; 