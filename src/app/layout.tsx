import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/Navbar";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AccessibilityControls } from "@/components/layout/AccessibilityControls";
import { Toaster } from "sonner";
import { Mail, Link2, Youtube } from 'lucide-react';

export const metadata: Metadata = {
  title: "מאגר הכלים של חולמים תקשוב",
  description: "מאגר כלי AI למורים, פרויקט חולמים תקשוב של חפציה בן ארצי",
  authors: [{ name: "חפציה בן ארצי", url: "https://linktr.ee/chepti" }],
  keywords: ["כלי AI", "מורים", "חינוך", "טכנולוגיה בחינוך", "חולמים תקשוב", "חפציה בן ארצי"],
  creator: "חפציה בן ארצי",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="he" className="light" suppressHydrationWarning dir="rtl">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-rubik min-h-screen bg-background antialiased transition-colors">
          <AccessibilityProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)] container mx-auto px-4">
              {children}
            </main>
            <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t">
              <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div>
                    <p className="font-medium">
                      פותח בגאווה על ידי חפציה בן ארצי
                    </p>
                    <p className="mt-1 font-bold text-blue-600 dark:text-blue-400">
                      פרויקט חולמים תקשוב © {new Date().getFullYear()}
                    </p>
                    <div className="flex space-x-4 rtl:space-x-reverse mt-3 justify-center">
                      <a 
                        href="mailto:chepti@gmail.com" 
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                      <a 
                        href="https://tikshuv.chepti.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                        aria-label="אתר חולמים תקשוב"
                      >
                        <Link2 className="h-5 w-5" />
                      </a>
                      <a 
                        href="https://linktr.ee/chepti" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                        aria-label="Linktree"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                            <path d="M7.953 15.066c-.08.163-.08.324-.08.486 0 1.683 1.004 2.978 2.893 2.978 1.737 0 3.103-1.135 3.103-3.346V3.207h2.352v11.977c0 3.346-2.163 5.431-5.431 5.431-2.812 0-4.605-1.79-5.139-3.644l2.352-1.061v.156zm6.484-13.915h-2.351v.981h2.351v-.981zm-7.816.981v-.981H4.269v15.066c0 2.001 1.302 3.346 3.103 3.346v-1.818c-.684 0-1.171-.516-1.171-1.324V2.132h1.42z" />
                        </svg>
                      </a>
                      <a 
                        href="https://www.youtube.com/@chepti1" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        aria-label="YouTube"
                      >
                        <Youtube className="h-5 w-5" />
                      </a>
                    </div>
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
