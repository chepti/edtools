import mongoose, { Schema, Document, models, Model } from 'mongoose';

// רמות קושי אפשריות
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// ממשק עבור נתוני כלי AI
export interface ITool extends Document {
  name: string;
  link: string;
  logoUrl?: string;
  description?: string;
  advantages?: string[];
  disadvantages?: string[];
  limitations?: string[];
  difficultyLevel?: DifficultyLevel;
  hebrewSupport?: boolean;
  isFree?: boolean;
  outputType?: string; // סוג תוצר (טקסט, תמונה, קוד...)
  pedagogicalContext?: string[]; // הקשר פדגוגי (הקניה, תרגול, הערכה...)
  communicationFormat?: string; // פורמט תקשורת (טקסט, קול...)
  usageInTeaching?: string[]; // שימושים בהוראה
  tags?: string[]; // תגיות לסינון
  createdByAdminId?: string; // Clerk User ID של האדמין שיצר (יכול להיות null אם מורה יצר)
  createdAt: Date;
  updatedAt: Date;
}

// סכמה עבור כלי AI
const ToolSchema = new Schema<ITool>(
  {
    name: { type: String, required: true, index: true },
    link: { type: String, required: true },
    logoUrl: { type: String, required: false },
    description: { type: String, required: false },
    advantages: { type: [String], default: [] },
    disadvantages: { type: [String], default: [] },
    limitations: { type: [String], default: [] },
    difficultyLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: false,
    },
    hebrewSupport: { type: Boolean, default: false, index: true }, // אינדקס לסינון מהיר
    isFree: { type: Boolean, default: false, index: true }, // אינדקס לסינון מהיר
    outputType: { type: String, required: false },
    pedagogicalContext: { type: [String], default: [] },
    communicationFormat: { type: String, required: false },
    usageInTeaching: { type: [String], default: [] },
    tags: { type: [String], default: [], index: true }, // אינדקס לחיפוש וסינון לפי תגיות
    createdByAdminId: { type: String, required: false }, // הפניה לאדמין לפי Clerk ID
    // שדות נגזרים כמו דירוג ממוצע, ספירת הדרכות/דוגמאות/מדפים - לא נשמרים ישירות כאן
    // אלא מחושבים בזמן השאילתה או בעזרת aggregation pipelines ב-MongoDB
  },
  {
    timestamps: true,
  }
);

// אינדקס טקסטואלי לחיפוש חופשי בשם ובתיאור
ToolSchema.index({ name: 'text', description: 'text', tags: 'text' });

// יצירת המודל (אם לא קיים) והחזרתו
const Tool: Model<ITool> = models.Tool || mongoose.model<ITool>('Tool', ToolSchema);

export default Tool; 