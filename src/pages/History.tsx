import { useState, useEffect } from 'react';
import type { HistoryEntry } from '../types';
import './History.css';

export default function History() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('conversion-history') || '[]');
    setHistory(stored);
  }, []);

  function clearHistory() {
    localStorage.removeItem('conversion-history');
    setHistory([]);
  }

  function removeEntry(id: string) {
    const updated = history.filter(e => e.id !== id);
    localStorage.setItem('conversion-history', JSON.stringify(updated));
    setHistory(updated);
  }

  return (
    <div className="history-page">
      <div className="history-header">
        <div>
          <h1>History</h1>
          <p>{history.length} saved conversion{history.length !== 1 ? 's' : ''}</p>
        </div>
        {history.length > 0 && (
          <button className="btn-danger" onClick={clearHistory}>Clear all</button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="history-empty">
          <div className="empty-icon">🕐</div>
          <p>No conversions saved yet.</p>
          <p className="empty-sub">Head to the converter and hit "Save to history".</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map(entry => (
            <div key={entry.id} className="history-card">
              <div className="history-main">
                <div className="history-conversion">
                  <span className="h-amount">{entry.amount.toLocaleString()} {entry.from}</span>
                  <span className="h-arrow">→</span>
                  <span className="h-result">{entry.result.toLocaleString(undefined, { maximumFractionDigits: 4 })} {entry.to}</span>
                </div>
                <div className="history-meta">
                  <span>Rate: 1 {entry.from} = {entry.rate.toLocaleString(undefined, { maximumFractionDigits: 6 })} {entry.to}</span>
                  <span>·</span>
                  <span>{new Date(entry.timestamp * 1000).toLocaleDateString()}</span>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeEntry(entry.id)} title="Remove">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
