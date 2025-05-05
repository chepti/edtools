import mongoose, { Schema, Document, models, Model, Types } from 'mongoose';

// סוגי פריטים שניתן לדווח עליהם
export type ReportableType = 'Tutorial' | 'Example' | 'Review';

// ממשק עבור הנתונים של דיווח
export interface IReport extends Document {
  reporterUserId: string; // Clerk User ID של המדווח
  reportedItemId: Types.ObjectId; // מזהה הפריט המדווח
  reportedItemType: ReportableType; // סוג הפריט המדווח
  reason: string; // סיבת הדיווח
  status: 'pending' | 'resolved_removed' | 'resolved_edited' | 'resolved_kept' | 'dismissed'; // סטטוס טיפול
  resolvedAt?: Date; // מתי טופל
  resolvedByAdminId?: string; // Clerk User ID של האדמין שטיפל
  createdAt: Date;
  updatedAt: Date;
}

// סכמה עבור דיווחים
const ReportSchema = new Schema<IReport>(
  {
    reporterUserId: { type: String, required: true, index: true },
    reportedItemId: { type: Schema.Types.ObjectId, required: true },
    reportedItemType: {
      type: String,
      required: true,
      enum: ['Tutorial', 'Example', 'Review'],
    },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: [
        'pending',
        'resolved_removed',
        'resolved_edited',
        'resolved_kept',
        'dismissed',
      ],
      default: 'pending',
      required: true,
      index: true, // אינדקס על סטטוס לסינון קל בפאנל אדמין
    },
    resolvedAt: { type: Date, required: false },
    resolvedByAdminId: { type: String, required: false }, // הפניה ל-Admin לפי Clerk ID
  },
  {
    timestamps: true,
  }
);

// אינדקס לחיפוש דיווחים על פריט ספציפי
ReportSchema.index({ reportedItemId: 1, reportedItemType: 1 });

// יצירת המודל (אם לא קיים) והחזרתו
const Report: Model<IReport> = models.Report || mongoose.model<IReport>('Report', ReportSchema);

export default Report; 