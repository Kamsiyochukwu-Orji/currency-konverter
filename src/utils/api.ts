import type { ExchangeRates, ConversionResult } from '../types';

const BASE_URL = 'https://open.er-api.com/v6/latest';

export async function fetchRates(base: string): Promise<ExchangeRates> {
  const res = await fetch(`${BASE_URL}/${base}`);
  if (!res.ok) throw new Error('Failed to fetch exchange rates');
  const data = await res.json();
  return {
    base: data.base_code,
    rates: data.rates,
    timestamp: data.time_last_update_unix,
  };
}

export function convert(
  amount: number,
  rate: number,
  from: string,
  to: string,
  timestamp: number
): ConversionResult {
  return {
    from,
    to,
    amount,
    result: parseFloat((amount * rate).toFixed(4)),
    rate,
    timestamp,
  };
}

export const POPULAR_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'NGN',
  'CAD', 'AUD', 'CHF', 'CNY', 'INR',
  'BRL', 'MXN', 'ZAR', 'KRW', 'AED',
  'SGD', 'HKD', 'SEK', 'NOK', 'DKK',
];

export const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound',
  JPY: 'Japanese Yen', NGN: 'Nigerian Naira', CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar', CHF: 'Swiss Franc', CNY: 'Chinese Yuan',
  INR: 'Indian Rupee', BRL: 'Brazilian Real', MXN: 'Mexican Peso',
  ZAR: 'South African Rand', KRW: 'South Korean Won', AED: 'UAE Dirham',
  SGD: 'Singapore Dollar', HKD: 'Hong Kong Dollar', SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone', DKK: 'Danish Krone',
};
