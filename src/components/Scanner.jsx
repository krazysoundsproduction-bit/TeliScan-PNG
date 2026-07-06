import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const SCANNER_ELEMENT_ID = 'teliscan-reader';

export default function Scanner({ onScanSuccess }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      SCANNER_ELEMENT_ID,
      {
        fps: 10,
        qrbox: { width: 280, height: 150 },
        rememberLastUsedCamera: true,
        aspectRatio: 1.5,
      },
      /* verbose= */ false,
    );

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear().catch(() => {});
      },
      () => {
        // Per-frame scan failures are expected; suppress them.
      },
    );

    scannerRef.current = scanner;

    return () => {
      scannerRef.current?.clear().catch(() => {});
    };
  }, [onScanSuccess]);

  return (
    <div className="scanner-wrapper">
      <p className="scanner-hint">
        Hold the barcode or QR code steady inside the frame
      </p>
      <div id={SCANNER_ELEMENT_ID} />
    </div>
  );
}
