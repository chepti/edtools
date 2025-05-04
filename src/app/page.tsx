import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Search, Star, GraduationCap, Palette, ShieldCheck, MessageSquareQuote } from 'lucide-react';

export default function Home() {
  return (
    <div dir="rtl" className="flex flex-col items-center justify-center py-12">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto text-center mb-16 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
          מרכז כלי AI להוראה
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          גלו, דרגו ולמדו כיצד לשלב כלי בינה מלאכותית מתקדמים בהוראה היומיומית שלכם.
          <br />
          פלטפורמה שיתופית למורים ואנשי חינוך מבית &quot;חולמים תקשוב&quot;.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white animate-slideInUp"
            style={{ animationDelay: '0.1s' }}
          >
            <Link href="/dashboard">
              <ArrowLeft className="ml-2 h-4 w-4" /> כניסה למרכז הכלים
            </Link>
          </Button>
          <Button 
            variant="outline" 
            asChild
            size="lg"
            className="animate-slideInUp border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
            style={{ animationDelay: '0.2s' }}
          >
            <Link href="/sign-up">הרשמה</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto mb-16 text-right">
        <h2 className="text-3xl font-bold text-center mb-12">מה תמצאו בפלטפורמה?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="flex items-center justify-end mb-4">
                <h3 className="text-xl font-semibold ml-4">{feature.title}</h3>
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
                  <feature.icon className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-5xl mx-auto text-center bg-gradient-to-r from-orange-300 to-yellow-200 rounded-xl p-10 text-orange-900 mb-16 animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4">מוכנים לשדרג את ההוראה?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          הצטרפו לקהילת המורים שלנו, גלו כלים חדשים והתחילו לשלב AI בכיתה עוד היום.
        </p>
        <Button 
          asChild
          size="lg" 
          className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg"
        >
          <Link href="/dashboard">
            <ArrowLeft className="ml-2 h-4 w-4" /> התחילו עכשיו
          </Link>
        </Button>
      </section>

      {/* Branding */}
      <section className="w-full max-w-3xl mx-auto text-center mb-8 animate-fadeIn">
        <p className="text-xl font-semibold bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
          חולמים תקשוב - מובילים חדשנות בחינוך
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ליצירת קשר:{' '}
          <a href="mailto:chepti@gmail.com" className="text-blue-500 hover:underline">chepti@gmail.com</a> | 
          <a href="tel:054-4477081" className="text-blue-500 hover:underline">054-4477081</a>
        </p>
      </section>
    </div>
  );
}

const features = [
  {
    title: 'מאגר כלים מקיף',
    description: 'קטלוג מתעדכן של כלי AI מובילים להוראה, מסווגים לפי נושאים ומיומנויות.',
    icon: Search,
  },
  {
    title: 'דירוג וחוות דעת',
    description: 'קהילת מורים משתפת ומדרגת כלים מניסיונם האישי בכיתה.',
    icon: Star,
  },
  {
    title: 'הדרכות ודוגמאות שימוש',
    description: 'מדריכים מעשיים, סרטונים ודוגמאות לשילוב הכלים במערכי שיעור.',
    icon: GraduationCap,
  },
  {
    title: 'שיתוף ויצירה',
    description: 'מרחב לשתף רעיונות, לשאול שאלות וליצור יחד חומרי למידה מבוססי AI.',
    icon: MessageSquareQuote,
  },
  {
    title: 'ממשק נגיש וידידותי',
    description: 'עיצוב נקי ונוח לשימוש, מותאם לכל המכשירים וכולל אפשרויות נגישות.',
    icon: Palette,
  },
  {
    title: 'בטיחות ואמינות',
    description: 'מידע על היבטי פרטיות, אבטחת מידע והטיית אלגוריתמים בכלים השונים.',
    icon: ShieldCheck,
  },
];
