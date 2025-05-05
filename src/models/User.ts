import mongoose, { Schema, Document, models, Model } from 'mongoose';

// תפקידי משתמשים אפשריים
export type UserRole = 'teacher' | 'admin';

// ממשק עבור נתוני משתמש
export interface IUser extends Document {
  _id: string; // ישמש כ-Clerk User ID
  displayName: string; // כינוי, ייחודי
  profilePictureUrl?: string; // נתיב לתמונת פרופיל (אופציונלי)
  role: UserRole; // תפקיד המשתמש
  createdAt: Date;
  updatedAt: Date;
  // רשימות של פריטים שהמשתמש יצר/עוקב (לא נשמרים כאן ישירות, אלא מבוססים על שאילתות)
  // ניתן להוסיף שדות נוספים בעתיד, למשל הגדרות אישיות
}

// סכמה עבור משתמשים
const UserSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true }, // שימוש ב-Clerk User ID כמפתח ראשי
    displayName: { type: String, required: true, unique: true, index: true },
    profilePictureUrl: { type: String, required: false },
    role: {
      type: String,
      enum: ['teacher', 'admin'],
      default: 'teacher',
      required: true,
    },
  },
  {
    timestamps: true,
    _id: false, // מניעת יצירת _id אוטומטי על ידי Mongoose, משתמשים ב-Clerk ID
  }
);

// יצירת המודל (אם לא קיים) והחזרתו
const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default User; 