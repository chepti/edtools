import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

export async function generateCSRFToken(): Promise<string> {
  const token = randomBytes(32).toString('hex');
  // No direct way to await cookies().set in a function that must return the token immediately
  // for a meta tag. This approach is problematic for App Router if called during render.
  // Typically, CSRF token generation/setting for cookies would happen in a Server Action or Route Handler.
  // For now, let's assume this function might be called where it *can* set a cookie (e.g., middleware or API route before response).
  // However, the function signature implies it generates and returns, with setting as a side-effect.
  // This is an architectural challenge with CSRF in App Router if not done via Server Actions.

  // If this is meant to be used to set a cookie AND return a token for a meta tag in one go,
  // it needs to be called from a context that can modify headers/cookies (Server Action, Route Handler, Middleware).
  // Let's proceed by making it async and assuming the caller handles the Promise.
  (await cookies()).set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 3600, // 1 hour
  });
  return token;
}

export async function validateCSRFToken(token: string): Promise<boolean> {
  const storedToken = (await cookies()).get('csrf-token')?.value;
  if (!storedToken || storedToken !== token) {
    return false;
  }
  return true;
}

// Client-side functions to work with CSRF tokens
export const clientCSRF = {
  getCSRFFromMeta: (): string | null => {
    if (typeof document === 'undefined') return null; 
    const csrfMeta = document.querySelector('meta[name="csrf-token"]');
    return csrfMeta ? csrfMeta.getAttribute('content') : null;
  },
  
  attachCSRFToFormData: (formData: FormData): FormData => {
    const token = clientCSRF.getCSRFFromMeta();
    if (token) {
      formData.append('csrf-token', token);
    }
    return formData;
  },
  
  attachCSRFToHeaders: (headers: HeadersInit = {}): HeadersInit => {
    const token = clientCSRF.getCSRFFromMeta();
    if (token) {
      const newHeaders = new Headers(headers);
      newHeaders.append('X-CSRF-Token', token);
      return newHeaders;
    }
    return headers;
  }
}; 