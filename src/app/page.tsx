import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Search, BookOpen, Users, Database, Star, Lightbulb, Edit3 } from 'lucide-react';
import clientPromise from "@/lib/mongodb";

export default async function Home() {
  let dbStatus = "בודק חיבור למסד הנתונים...";
  let dbConnectionSuccessful = false;

  try {
    const client = await clientPromise;
    await client.db().admin().ping();
    dbStatus = "התחבר בהצלחה ל-MongoDB!";
    dbConnectionSuccessful = true;
    console.log("MongoDB connection successful via ping.");
  } catch (e) {
    console.error("MongoDB connection error:", e);
    dbStatus = "נכשל בהתחברות ל-MongoDB. בדוק את יומני השרת ואת משתנה הסביבה MONGODB_URI.";
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto text-center mb-16 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-500 bg-clip-text text-transparent">
          חולמים תקשוב: כלי AI למורים
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          מאגר מתעדכן של כלי בינה מלאכותית, עם הסברים, דירוגים והדרכות שיעזרו לכם לשלב חדשנות בהוראה.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 animate-slideInUp"
            style={{ animationDelay: '0.1s' }}
          >
            <Link href="/tools"> {/* Assuming /tools will be the main page for tools */}
              גלה כלים <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            size="lg"
            className="animate-slideInUp border-blue-500 text-blue-600 hover:bg-blue-50"
            style={{ animationDelay: '0.2s' }}
          >
            <Link href="/sign-up">הרשמה</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">מה תמצאו כאן?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-5xl mx-auto text-center bg-gradient-to-r from-blue-600 to-sky-500 rounded-xl p-10 text-white mb-16 animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4">מוכנים לשדרג את ההוראה?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          התחילו לחקור את מאגר הכלים, הוסיפו משלכם, ושתפו את הקהילה בידע ובניסיון שלכם.
        </p>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          <Link href="/tools"> {/* Assuming /tools will be the main page for tools */}
            התחילו לחקור <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Branding */}
      <section className="w-full max-w-3xl mx-auto text-center mb-8 animate-fadeIn">
        <p className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-500 bg-clip-text text-transparent mb-2">
          חולמים תקשוב - פיתוח מאת חפציה בן ארצי
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ליצירת קשר:{' '}
          <a href="mailto:chepti@gmail.com" className="text-blue-500 hover:underline">chepti@gmail.com</a>
          <br />
          בקרו באתר:{' '}
          <a href="https://tikshuv.chepti.com/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">tikshuv.chepti.com</a>
          <br />
          עקבו אחרינו:{' '}
          <a href="https://linktr.ee/chepti" className="text-green-500 hover:underline" target="_blank" rel="noopener noreferrer">Linktree</a>,{' '}
          <a href="https://www.youtube.com/@chepti1" className="text-red-500 hover:underline" target="_blank" rel="noopener noreferrer">YouTube</a>
        </p>
      </section>

      {/* Database Connection Status Message */}
      <div className="my-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">בדיקת חיבור למסד הנתונים:</h2>
        <p className={dbConnectionSuccessful ? "text-green-500" : "text-red-500"}>
          {dbStatus}
        </p>
        {!dbConnectionSuccessful && (
          <p className="text-sm text-gray-400 mt-2">
            אנא בדוק את מסוף השרת (הטרמינל שלך) לקבלת הודעות שגיאה מפורטות יותר.
            ודא שמשתנה הסביבה MONGODB_URI בקובץ .env.local נכון ושה-IP שלך מאושר ב-MongoDB Atlas.
          </p>
        )}
      </div>
    </div>
  );
}

const features = [
  {
    title: 'מאגר כלי AI מגוון',
    description: 'גישה למבחר כלי בינה מלאכותית המתאימים למורים, עם תיאורים והסברים מפורטים.',
    icon: Search, // Changed icon
  },
  {
    title: 'הדרכות ודוגמאות שימוש',
    description: 'מדריכים ידידותיים ודוגמאות מעשיות שיעזרו לכם להתחיל להשתמש בכלים השונים.',
    icon: BookOpen, // Changed icon
  },
  {
    title: 'דירוג וסקירת כלים',
    description: 'דרגו כלים ושתפו את דעתכם עם קהילת המורים. למדו מניסיונם של אחרים.',
    icon: Star, // Changed icon
  },
  {
    title: 'סינון וחיפוש חכמים',
    description: 'מצאו בקלות את הכלים המתאימים לכם לפי קטגוריות, מקצועות, או מיומנויות.',
    icon: Lightbulb, // Changed icon
  },
  {
    title: 'יצירת "מדפים" אישיים',
    description: 'אספו וארגנו את כלי ה-AI האהובים עליכם באוספים אישיים ושתפו אותם.',
    icon: Users, // Kept Users icon for "personal shelves"
  },
  {
    title: 'קהילה ותרומת תוכן',
    description: 'הציעו כלים חדשים, הוסיפו תוכן ושתפו מהידע שלכם עם קהילת המורים בישראל.',
    icon: Edit3, // Changed icon
  },
];
