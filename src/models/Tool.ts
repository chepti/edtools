import mongoose, { Schema, Document, models } from 'mongoose';

export interface ITool extends Document {
  name: string;
  link: string;
  logo?: string;
  description: string;
  limitations?: string;
  advantages?: string;
  disadvantages?: string;
  rating?: number; // דירוג כלי
  usageInTeaching?: string; // שימוש בהוראה
  relatedTutorials?: Schema.Types.ObjectId[]; // הדרכות קשורות (מצביע ל-Tutorials)
  examplesAndPrompts?: Schema.Types.ObjectId[]; // דוגמאות ופרומפטים (מצביע ל-Examples)
  difficultyLevel?: 'קל' | 'בינוני' | 'קשה'; // רמת קושי
  hebrewSupport: boolean; // תמיכה בעברית
  isFree: boolean; // חינמיות
  outputType?: string; // סוג התוצר
  pedagogicalContext?: ('הקניה' | 'תרגול' | 'הערכה')[]; // הקשר פדגוגי
  communicationFormat?: string; // פורמט תקשורת
}

const ToolSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  link: { type: String, required: true, trim: true },
  logo: { type: String, trim: true },
  description: { type: String, required: true },
  limitations: { type: String },
  advantages: { type: String },
  disadvantages: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  usageInTeaching: { type: String },
  relatedTutorials: [{ type: Schema.Types.ObjectId, ref: 'Tutorial' }],
  examplesAndPrompts: [{ type: Schema.Types.ObjectId, ref: 'Example' }],
  difficultyLevel: { type: String, enum: ['קל', 'בינוני', 'קשה'] },
  hebrewSupport: { type: Boolean, default: false },
  isFree: { type: Boolean, default: false },
  outputType: { type: String },
  pedagogicalContext: [{ type: String, enum: ['הקניה', 'תרגול', 'הערכה'] }],
  communicationFormat: { type: String },
}, { timestamps: true });

const Tool = models.Tool || mongoose.model<ITool>('Tool', ToolSchema);

export default Tool; 