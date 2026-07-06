import { useState } from 'react';

export default function VoucherResult({ code, onScanAgain }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; the user can still copy manually.
    }
  };

  return (
    <div className="result-card">
      <div className="result-success-icon" aria-hidden="true">✓</div>
      <h2>Voucher Code Found</h2>
      <p className="result-label">Your Rait Card PIN</p>

      <div className="result-code-row">
        <span className="result-code" role="status" aria-live="polite">
          {code}
        </span>
        <button
          className="copy-btn"
          onClick={handleCopy}
          aria-label="Copy voucher code to clipboard"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>

      <button className="scan-again-btn" onClick={onScanAgain}>
        Scan Another Card
      </button>
    </div>
  );
}
