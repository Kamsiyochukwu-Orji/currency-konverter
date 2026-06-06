import { useState } from 'react';
import { useRates } from '../hooks/useRates';
import { POPULAR_CURRENCIES, CURRENCY_NAMES } from '../utils/api';
import './Rates.css';

export default function Rates() {
  const [base, setBase] = useState('USD');
  const [search, setSearch] = useState('');
  const { rates, loading, error, refetch } = useRates(base);

  const filtered = POPULAR_CURRENCIES.filter(c =>
    c !== base && (
      c.toLowerCase().includes(search.toLowerCase()) ||
      (CURRENCY_NAMES[c] ?? '').toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="rates-page">
      <div className="rates-header">
        <div>
          <h1>Live Rates</h1>
          {rates && (
            <p>Last updated: {new Date(rates.timestamp * 1000).toLocaleString()}</p>
          )}
        </div>
        <button className="btn-ghost" onClick={refetch}>↻ Refresh</button>
      </div>

      <div className="rates-controls">
        <div className="field-group">
          <label>Base currency</label>
          <select value={base} onChange={e => setBase(e.target.value)}>
            {POPULAR_CURRENCIES.map(c => (
              <option key={c} value={c}>{c} — {CURRENCY_NAMES[c] ?? c}</option>
            ))}
          </select>
        </div>
        <div className="field-group">
          <label>Search</label>
          <input
            type="text"
            className="search-input"
            placeholder="Filter currencies…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="error-bar">⚠ {error} <button onClick={refetch}>Retry</button></div>}

      {loading ? (
        <div className="rates-skeleton">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="skeleton-row" />
          ))}
        </div>
      ) : (
        <div className="rates-table">
          <div className="rates-table-head">
            <span>Currency</span>
            <span>Name</span>
            <span className="align-right">1 {base} =</span>
          </div>
          {filtered.map(c => (
            <div key={c} className="rates-table-row">
              <span className="currency-code">{c}</span>
              <span className="currency-name">{CURRENCY_NAMES[c] ?? c}</span>
              <span className="currency-rate align-right">
                {rates?.rates[c]?.toLocaleString(undefined, { maximumFractionDigits: 6 }) ?? '—'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
