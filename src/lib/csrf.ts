import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

export async function generateCSRFToken(): Promise<string> {
  const token = randomBytes(32).toString('hex');
  const cookieStore = await cookies();
  cookieStore.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  return token;
}

export async function validateCSRFToken(token: string): Promise<boolean> {
  const cookieStore = await cookies();
  const storedToken = cookieStore.get('csrf-token')?.value;
  return storedToken === token;
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