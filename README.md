# 💱 Converto — Currency Converter

A clean, fast currency converter built with **React 19**, **TypeScript**, and **React Router**. Convert between 20 popular currencies using live exchange rates — no API key required.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗂 Project Structure

```
currency-converter/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Sticky navbar with active route highlighting
│   │   └── Navbar.css
│   ├── hooks/
│   │   └── useRates.ts       # Custom hook for fetching & caching exchange rates
│   ├── pages/
│   │   ├── Converter.tsx     # Main converter page
│   │   ├── Converter.css
│   │   ├── Rates.tsx         # Live rates table with search & base currency switcher
│   │   ├── Rates.css
│   │   ├── History.tsx       # Saved conversions from localStorage
│   │   └── History.css
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── utils/
│   │   └── api.ts            # API functions, currency lists & constants
│   ├── App.tsx               # Root component with BrowserRouter & routes
│   ├── index.css             # Global styles & design tokens
│   └── main.tsx              # App entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 📄 Pages & Routing

| Route | Component | Description |
|---|---|---|
| `/` | `Converter.tsx` | Convert between any two currencies with live rates |
| `/rates` | `Rates.tsx` | Live rates table, switchable base currency, search filter |
| `/history` | `History.tsx` | Saved conversions with delete and clear all options |

---

## 🔌 API

Uses the **[Open Exchange Rates API](https://open.er-api.com)** — completely free with no API key required.

| Function | Endpoint | Description |
|---|---|---|
| `fetchRates(base)` | `GET /v6/latest/:base` | Fetch all rates for a given base currency |

All API logic lives in `src/utils/api.ts`. Rate fetching and caching is handled by the `useRates` custom hook in `src/hooks/useRates.ts`.

---

## 🧩 Key Features

- **Live conversion** — rates update automatically when you change currency or amount
- **20 currencies** — USD, EUR, GBP, JPY, NGN, CAD, AUD, CHF, CNY, INR, BRL, MXN, ZAR, KRW, AED, SGD, HKD, SEK, NOK, DKK
- **Swap button** — instantly swap the from/to currencies
- **Rate caching** — rates are cached for 10 minutes per base currency to avoid unnecessary API calls
- **Live rates table** — searchable table with switchable base currency
- **Conversion history** — saved to localStorage, persists across browser sessions, max 50 entries
- **Error handling** — friendly error message with retry button if the API call fails
- **Refresh rates** — manual refresh button on both the converter and rates pages

---

## 🪝 Custom Hook — useRates

The `useRates(base)` hook handles all data fetching logic:

```ts
const { rates, loading, error, refetch } = useRates('USD')
```

| Return value | Type | Description |
|---|---|---|
| `rates` | `ExchangeRates or null` | The fetched rates object |
| `loading` | `boolean` | True while fetching |
| `error` | `string or null` | Error message if fetch failed |
| `refetch` | `() => void` | Manually trigger a fresh fetch |

Caching is handled in-memory with a 10-minute TTL per base currency — switching back to a previously loaded currency is instant.

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| React Router 7 | Client-side routing |
| Vite | Build tool & dev server |
| localStorage | Conversion history persistence |
| Google Fonts | Typography (Syne + DM Sans) |

---

## 🌍 Deployment

No environment variables required. Deploy to **Vercel** in two steps:

1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com) — Vercel auto-detects Vite

For SPA routing to work correctly on Vercel, add a `vercel.json` at the root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 📸 Pages Overview

- **Converter** — amount input, from/to selectors, swap button, live result display, save to history
- **Live Rates** — base currency dropdown, search filter, full rates table with last updated timestamp
- **History** — list of saved conversions with rate info, individual delete, and clear all button

---

## 📝 License

MIT — free to use and modify.