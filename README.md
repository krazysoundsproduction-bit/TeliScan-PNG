# TeliScan PNG

A mobile-friendly web app that uses your device camera to scan Telikom PNG Rait Card voucher barcodes and QR codes, instantly revealing the top-up PIN.

## Features

- 📷 **Camera scanning** — uses `html5-qrcode` to read 1D barcodes and QR codes
- 📋 **One-tap copy** — copy the voucher PIN to clipboard instantly
- 🌙 **Dark mode** — respects system colour-scheme preference
- ⚡ **Fast** — the scanner library is lazily loaded so the initial page is small
- 📱 **Mobile-first** — responsive layout optimised for phones

## Getting Started

```bash
npm install
npm run dev        # development server on http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run lint       # ESLint
npm test           # Vitest unit tests
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vite.dev) | Build tooling |
| [React 19](https://react.dev) | UI framework |
| [html5-qrcode](https://github.com/mebjas/html5-qrcode) | Camera / barcode scanning |
| [Vitest](https://vitest.dev) | Unit testing |
| [ESLint](https://eslint.org) | Linting |
