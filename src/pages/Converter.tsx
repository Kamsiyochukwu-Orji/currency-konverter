import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRates } from "../hooks/useRates";
import { convert, POPULAR_CURRENCIES, CURRENCY_NAMES } from "../utils/api";
import type { HistoryEntry } from "../types";
import "./Converter.css";

export default function Converter() {
  const [amount, setAmount] = useState<string>("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");
  const [result, setResult] = useState<number | null>(null);
  const navigate = useNavigate();

  const { rates, loading, error, refetch } = useRates(from);

  useEffect(() => {
    if (rates && amount && !isNaN(Number(amount))) {
      const rate = rates.rates[to];
      if (rate) {
        const conversion = convert(
          Number(amount),
          rate,
          from,
          to,
          rates.timestamp,
        );
        setResult(conversion.result);
      }
    }
  }, [rates, amount, from, to]);

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  function handleSave() {
    if (!rates || result === null) return;
    const rate = rates.rates[to];
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      from,
      to,
      amount: Number(amount),
      result,
      rate,
      timestamp: rates.timestamp,
    };
    const existing = JSON.parse(
      localStorage.getItem("conversion-history") || "[]",
    );
    localStorage.setItem(
      "conversion-history",
      JSON.stringify([entry, ...existing].slice(0, 50)),
    );
    navigate("/history");
  }

  const rate = rates?.rates[to];

  return (
    <div className="converter-page">
      <div className="converter-hero">
        <h1>Currency Converter</h1>
        <p>Get your rates in secs</p>
      </div>

      <div className="converter-card">
        {error && (
          <div className="error-bar">
            ⚠ {error}
            <button onClick={refetch}>Retry</button>
          </div>
        )}

        <div className="field-group">
          <label>Amount</label>
          <input
            type="number"
            className="amount-input"
            value={amount}
            min="0"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="currency-row">
          <div className="field-group">
            <label>From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {POPULAR_CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c} — {CURRENCY_NAMES[c] ?? c}
                </option>
              ))}
            </select>
          </div>

          <button
            className="swap-btn"
            onClick={handleSwap}
            title="Swap currencies"
          >
            ⇄
          </button>

          <div className="field-group">
            <label>To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {POPULAR_CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c} — {CURRENCY_NAMES[c] ?? c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="result-box">
          {loading ? (
            <div className="loading-pulse">Fetching rates…</div>
          ) : result !== null ? (
            <>
              <div className="result-main">
                <span className="result-amount">
                  {Number(amount).toLocaleString()}
                </span>
                <span className="result-from">{from}</span>
                <span className="result-eq">=</span>
                <span className="result-value">
                  {result.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  })}
                </span>
                <span className="result-to">{to}</span>
              </div>
              {rate && (
                <div className="result-rate">
                  1 {from} ={" "}
                  {rate.toLocaleString(undefined, { maximumFractionDigits: 6 })}{" "}
                  {to}
                </div>
              )}
            </>
          ) : (
            <div className="result-placeholder">Enter an amount to convert</div>
          )}
        </div>

        <div className="converter-actions">
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={result === null || loading}
          >
            Save to history
          </button>
          <button className="btn-ghost" onClick={refetch}>
            Refresh rates
          </button>
        </div>
      </div>
    </div>
  );
}
