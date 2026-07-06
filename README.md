# TeliScan-PNG

TeliScan PNG is a mobile-first voucher scanning and processing project for Telikom PNG rait cards.

## Current MVP foundation (Phase 1)

This repository now includes a tested core service (`src/teliscan.js`) that covers the processing layer required by the app:

- Voucher code normalization (noise removal)
- Validation against Telikom-like prefix and length rules
- Dial-string formatting (`*123*VOUCHER#`)
- Manual/camera source tagging for each scan
- Local scan history model (bounded between 20 and 100 records, default 20)
- Basic settings model for:
  - auto-copy
  - dark mode
  - success feedback mode (sound/vibration)

## Run checks

```bash
npm test
npm run lint
npm run build
```

## Notes on mobile integration

The core logic is designed to plug into a Flutter or React Native camera/OCR flow. Camera capture, flash control, OCR and barcode reader UI should call `TeliScanService.processCode(rawCode, source)` to keep processing behavior consistent.
