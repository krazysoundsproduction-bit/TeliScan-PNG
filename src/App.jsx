import { useState, useCallback, lazy, Suspense } from 'react'
import VoucherResult from './components/VoucherResult'
import './App.css'

const Scanner = lazy(() => import('./components/Scanner'))

function App() {
  const [scannedCode, setScannedCode] = useState(null)
  const [scanning, setScanning] = useState(false)

  const handleStartScan = () => setScanning(true)

  const handleScanSuccess = useCallback((code) => {
    setScannedCode(code)
    setScanning(false)
  }, [])

  const handleScanAgain = () => {
    setScannedCode(null)
    setScanning(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-teli">Teli</span>
          <span className="brand-scan">Scan</span>
        </div>
        <p className="header-sub">Telikom PNG Rait Card Scanner</p>
      </header>

      <main className="app-main">
        {scannedCode ? (
          <VoucherResult code={scannedCode} onScanAgain={handleScanAgain} />
        ) : scanning ? (
          <Suspense fallback={<p className="scanner-hint">Loading camera…</p>}>
            <Scanner onScanSuccess={handleScanSuccess} />
          </Suspense>
        ) : (
          <div className="home-screen">
            <div className="card-illustration" aria-hidden="true">
              <div className="illus-card">
                <div className="illus-lines">
                  <div className="illus-line" />
                  <div className="illus-line short" />
                </div>
                <div className="illus-barcode">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className={`illus-bar ${i % 3 === 1 ? 'thin' : ''}`} />
                  ))}
                </div>
              </div>
            </div>

            <h1>Scan Your Rait Card</h1>
            <p className="home-desc">
              Point your camera at the barcode or QR code on your Telikom PNG
              Rait Card to reveal your top-up voucher PIN.
            </p>

            <button className="scan-btn" onClick={handleStartScan}>
              <svg className="scan-btn-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M2 7V3h4M18 3h4v4M22 17v4h-4M6 21H2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              Start Scanning
            </button>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} TeliScan · Telikom PNG</p>
      </footer>
    </div>
  )
}

export default App
