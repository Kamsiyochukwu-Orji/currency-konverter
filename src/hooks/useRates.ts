import { useState, useEffect, useCallback } from 'react';
import { fetchRates } from '../utils/api';
import type { ExchangeRates } from '../types';

const cache: Record<string, { data: ExchangeRates; fetchedAt: number }> = {};
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

export function useRates(base: string) {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const now = Date.now();
    const cached = cache[base];
    if (cached && now - cached.fetchedAt < CACHE_TTL) {
      setRates(cached.data);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRates(base);
      cache[base] = { data, fetchedAt: now };
      setRates(data);
    } catch {
      setError('Could not fetch rates. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, [base]);

  useEffect(() => { load(); }, [load]);

  return { rates, loading, error, refetch: load };
}
