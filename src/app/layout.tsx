import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/Navbar";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AccessibilityControls } from "@/components/layout/AccessibilityControls";
import { Toaster } from "sonner";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "מרכז כלי AI להוראה - חולמים תקשוב",
  description: "פלטפורמה לאיתור, דירוג ולמידה על כלי בינה מלאכותית למורים ואנשי חינוך.",
  authors: [{ name: "חולמים תקשוב - חפציה בן ארצי", url: "mailto:chepti@gmail.com" }],
  keywords: ["בינה מלאכותית", "AI", "חינוך", "הוראה", "מורים", "כלים דיגיטליים", "תקשוב"],
  creator: "חולמים תקשוב",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="he" dir="rtl" className="light" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@200..800&display=swap" rel="stylesheet" />
        </head>
        <body className="assistant-app min-h-screen bg-background antialiased transition-colors">
          <AccessibilityProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)] container mx-auto px-4">
              {children}
            </main>
            <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center space-x-2">
                  <div>
                    <p>
                      נבנה באהבה על ידי{' '}
                      <a 
                        href="mailto:chepti@gmail.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-600 transition-colors"
                      >
                        חולמים תקשוב - חפציה בן ארצי
                      </a> 
                    </p>
                    <p className="mt-1">מרכז כלי AI להוראה</p>
                  </div>
                </div>
              </div>
            </footer>
            <AccessibilityControls />
            <Toaster />
          </AccessibilityProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
