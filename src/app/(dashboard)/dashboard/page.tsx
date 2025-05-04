import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChevronsUp, Mail, Users, GraduationCap, Sparkles, Search, Star } from 'lucide-react';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  const userName = user?.firstName || "משתמש";

  return (
    <div dir="rtl" className="py-10 animate-fadeIn glass-blur-gradient">
      {/* Dashboard Banner */}
      <div className="animated-banner mb-8 rounded-md shadow-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-white animate-pulse" />
            <h2 className="text-lg font-semibold text-white">מרכז כלי AI להוראה</h2>
            <GraduationCap className="h-5 w-5 text-white animate-pulse" />
          </div>
          <span className="text-xs text-white opacity-80">{new Date().toLocaleDateString('he-IL')}</span>
        </div>
      </div>

      <div className="mb-8 text-right">
        <h1 className="text-3xl font-bold mb-2 glass-headline">
          {`ברוך הבא ${userName}!`}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">לוח הבקרה האישי שלך במרכז כלי ה-AI להוראה</p>
      </div>
      
      {/* Welcome Alert */}
      <Alert className="mb-8 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50 glass-shimmer text-right">
        <ChevronsUp className="h-4 w-4 text-blue-600 dark:text-blue-400 ml-2" />
        <AlertTitle className="glass-headline">ברוכים הבאים למרכז כלי ה-AI!</AlertTitle>
        <AlertDescription>
          כאן תוכלו למצוא, לדרג וללמוד על מגוון כלי בינה מלאכותית שיכולים לשדרג את ההוראה שלכם.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 text-right">
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-end gap-2">
               <span className="glass-headline">איתור וחיפוש כלים</span> <Search className="h-5 w-5 text-blue-600" />
            </CardTitle>
            <CardDescription>מצאו בקלות כלי AI לפי קטגוריה או צורך</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pr-5 space-y-1 text-sm">
              <li>סינון לפי מקצוע ותחום דעת</li>
              <li>חיפוש לפי מיומנות נדרשת</li>
              <li>כלים ליצירת תוכן לימודי</li>
              <li>כלים להערכה ומדידה</li>
              <li>ועוד רבים...</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-end gap-2">
              <span className="glass-headline">דירוג והמלצות</span> <Star className="h-5 w-5 text-blue-600" />
            </CardTitle>
            <CardDescription>למדו מניסיון של מורים אחרים</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pr-5 space-y-1 text-sm">
              <li>דירוג כלים על פי קריטריונים</li>
              <li>המלצות וחוות דעת מהקהילה</li>
              <li>שיתוף דוגמאות שימוש מוצלחות</li>
              <li>דיונים ופורומים מקצועיים</li>
              <li>סימון כלים מועדפים</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-end gap-2">
              <span className="glass-headline">הדרכה ולימוד</span> <GraduationCap className="h-5 w-5 text-blue-600" />
            </CardTitle>
            <CardDescription>שפרו את יכולות השימוש בכלי AI</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pr-5 space-y-1 text-sm">
              <li>מדריכים כתובים ומצולמים</li>
              <li>סדנאות מקוונות (בקרוב!)</li>
              <li>טיפים וטריקים לשימוש יעיל</li>
              <li>שילוב כלים במערכי שיעור</li>
              <li>עדכונים על כלים חדשים</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Resources */}
      <h2 className="text-2xl font-bold mb-4 glass-headline text-right">יצירת קשר</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-end gap-2">
                <span className="glass-headline">קישורים שימושיים</span> <Sparkles className="h-5 w-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-right">
              <li>
                <a href="#" className="text-blue-500 hover:underline">פורטל עובדי הוראה</a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">בלוגים מובילים על AI בחינוך</a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">קהילת מורים דיגיטליים</a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer text-right" style={{ animationDelay: '0.5s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-end gap-2">
               <span className="glass-headline">יצירת קשר</span> <Mail className="h-5 w-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">יש לכם שאלות? הצעות לכלי חדש? צרו קשר!</p>
            <p className="font-semibold">
              חולמים תקשוב - חפציה בן ארצי
            </p>
            <div className="mt-2 space-y-1">
              <p>טלפון: <a href="tel:054-4477081" className="text-blue-500 hover:underline">054-4477081</a></p>
              <p>מייל: <a href="mailto:chepti@gmail.com" className="text-blue-500 hover:underline">chepti@gmail.com</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 