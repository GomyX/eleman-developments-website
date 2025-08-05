import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = 'EGP'): string {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date, locale: string = 'ar'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function getDirection(locale: string): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function getFontFamily(locale: string): string {
  return locale === 'ar' ? 'font-arabic' : 'font-english';
}