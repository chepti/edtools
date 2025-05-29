'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Menu, X, Sparkles, BookOpen } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export function Navbar() {
  const { isSignedIn, user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { href: "/", label: "דף הבית" },
    { href: "/tools", label: "מאגר הכלים", icon: <BookOpen className="mr-1 h-4 w-4 inline-block" /> },
    { href: "/dashboard", label: "אזור אישי" },
  ];

  return (
    <>
      {/* Animated Banner - Updated for Chepti */}
      <div className="bg-gradient-to-r from-blue-500 via-sky-400 to-yellow-300 w-full text-center relative overflow-hidden py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-white font-medium">
          <Sparkles className="h-4 w-4" />
          <p className="text-sm">
            {isSignedIn ? `ברוך שובך, ${user?.firstName || 'משתמש'}! ברוכים הבאים ל"חולמים תקשוב"` : 'חולמים תקשוב: מאגר כלי AI למורים - בואו לגלות!'}
          </p>
          <Sparkles className="h-4 w-4" />
        </div>
      </div>
      
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b glass-blur-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image 
                  src="/logo.png"
                  alt="חולמים תקשוב לוגו" 
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium glass-shimmer ${
                      pathname === link.href
                        ? 'border-blue-500 text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                    }`}
                  >
                    {link.icon}{link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                {isSignedIn ? (
                  <div className="flex items-center space-x-4">
                    <div className="hidden lg:block mr-4">
                      <CustomErrorBoundary>
                        <ThemeToggle />
                      </CustomErrorBoundary>
                    </div>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="hidden lg:block mr-4">
                      <CustomErrorBoundary>
                        <ThemeToggle />
                      </CustomErrorBoundary>
                    </div>
                    <Link
                      href="/sign-in"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 glass-shimmer"
                    >
                      התחברות
                    </Link>
                    <Link
                      href="/sign-up"
                      className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 glass-shimmer"
                    >
                      הרשמה
                    </Link>
                  </div>
                )}
                {/* Mobile menu button */}
                <div className="flex items-center lg:hidden">
                  <CustomErrorBoundary>
                    <ThemeToggle />
                  </CustomErrorBoundary>
                  <button
                    type="button"
                    className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
                    aria-expanded="false"
                    aria-label="toggle menu"
                    onClick={toggleMobileMenu}
                  >
                    {isMobileMenuOpen ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Menu className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                 <Link
                  key={link.href + '-mobile'}
                  href={link.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    pathname === link.href
                      ? 'bg-sky-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}{link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

class CustomErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Theme toggle error:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      console.error("Theme toggle failed:", this.state.error);
      // Return fallback UI
      return (
        <div className="w-10 h-10 flex items-center justify-center">
          <span className="text-red-500">⚠️</span>
        </div>
      );
    }

    return this.props.children;
  }
} 