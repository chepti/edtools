import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChevronsUp, Mail, Sparkles, BookOpen, Lightbulb, Edit3, Search } from 'lucide-react';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="py-10 animate-fadeIn glass-blur-gradient">
      {/* Dashboard Banner */}
      <div className="animated-banner mb-8 rounded-md shadow-lg overflow-hidden bg-gradient-to-r from-blue-500 to-sky-400">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
            <h2 className="text-lg font-semibold text-white">ברוכים הבאים ללוח הבקרה שלך</h2>
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <span className="text-xs text-white opacity-80">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 glass-headline">ברוך הבא, {user.firstName || 'משתמש'}!</h1>
        <p className="text-gray-500 dark:text-gray-400">לוח הבקרה האישי שלך ב"חולמים תקשוב"</p>
      </div>
      
      {/* Welcome Alert */}
      <Alert className="mb-8 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/50 glass-shimmer">
        <ChevronsUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="glass-headline">ברוכים הבאים ל"חולמים תקשוב"!</AlertTitle>
        <AlertDescription>
          זהו אזור אישי למשתמשים רשומים. כאן תוכלו לנהל את הכלים שלכם, ליצור מדפים, לתרום תוכן ועוד.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" /> <span className="glass-headline">גילוי כלים</span>
            </CardTitle>
            <CardDescription>חקרו את מאגר כלי ה-AI שלנו</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>חיפוש וסינון מתקדם</li>
              <li>כלים חדשים מתווספים בקביעות</li>
              <li>קטגוריות ותגיות מגוונות</li>
              <li>מידע מפורט על כל כלי</li>
              <li>קישורים ישירים לשימוש והדרכות</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" /> <span className="glass-headline">המדפים שלי</span>
            </CardTitle>
            <CardDescription>ארגנו את הכלים שלכם באוספים</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>צרו "מדפים" אישיים</li>
              <li>הוסיפו כלים מועדפים למדפים</li>
              <li>שתפו מדפים עם עמיתים (בקרוב)</li>
              <li>גשו במהירות לכלים החשובים לכם</li>
              <li>התאימו את המדפים לצרכים שלכם</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-blue-600" /> <span className="glass-headline">תרומת תוכן</span>
            </CardTitle>
            <CardDescription>עזרו לנו להרחיב את המאגר</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>הציעו כלי AI חדשים למאגר</li>
              <li>דרגו וכתבו סקירות על כלים</li>
              <li>שתפו הדרכות וטיפים משלכם</li>
              <li>השתתפו בקהילת המורים</li>
              <li>עזרו לשפר את המידע הקיים</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Resources & Contact Section - Adapted for Chepti */}
      <h2 className="text-2xl font-bold mb-4 glass-headline">מידע נוסף ויצירת קשר</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600" /> <span className="glass-headline">מקורות וקישורים שימושיים</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://tikshuv.chepti.com/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  אתר חולמים תקשוב 
                  <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
               <li>
                <a 
                  href="https://www.youtube.com/@chepti1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-500 hover:underline flex items-center gap-1"
                >
                  ערוץ היוטיוב של חפציה
                  <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                {/* Add more relevant links if needed */}
                <p className="text-sm text-gray-500">בקרוב: קישורים למאמרים ומדריכים.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="transform transition-all duration-300 hover:shadow-lg animate-slideInUp glass-shimmer" style={{ animationDelay: '0.5s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" /> <span className="glass-headline">יצירת קשר</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">יש לכם שאלות, הצעות או רעיונות?</p>
            <p className="glass-headline font-semibold">
              חפציה בן ארצי - חולמים תקשוב
            </p>
            <div className="flex gap-4 mt-4">
              <a 
                href="mailto:chepti@gmail.com"
                className="text-gray-700 hover:text-blue-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a 
                href="https://linktr.ee/chepti" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600 transition-colors"
                aria-label="Linktree"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.953 15.066c-.08.163-.08.324-.08.486 0 1.683 1.004 2.978 2.893 2.978 1.737 0 3.103-1.135 3.103-3.346V3.207h2.352v11.977c0 3.346-2.163 5.431-5.431 5.431-2.812 0-4.605-1.79-5.139-3.644l2.352-1.061v.156zm6.484-13.915h-2.351v.981h2.351v-.981zm-7.816.981v-.981H4.269v15.066c0 2.001 1.302 3.346 3.103 3.346v-1.818c-.684 0-1.171-.516-1.171-1.324V2.132h1.42z" />
                </svg>
              </a>
               <a 
                href="https://www.youtube.com/@chepti1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-600 transition-colors"
                aria-label="YouTube"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 42.276 48.284 48.597 42.599 11.486 213.371 11.486 213.371 11.486s170.771 0 213.371-11.486c23.497-6.322 42.003-24.947 48.284-48.597 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 