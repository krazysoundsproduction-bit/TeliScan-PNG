import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import VoucherResult from '../components/VoucherResult'

describe('VoucherResult', () => {
  it('displays the scanned voucher code', () => {
    const code = '1234-5678-9012-3456'
    render(<VoucherResult code={code} onScanAgain={() => {}} />)
    expect(screen.getByText(code)).toBeInTheDocument()
  })

  it('shows "Voucher Code Found" heading', () => {
    render(<VoucherResult code="0000-0000" onScanAgain={() => {}} />)
    expect(screen.getByRole('heading', { name: /voucher code found/i })).toBeInTheDocument()
  })

  it('calls onScanAgain when the button is clicked', () => {
    const onScanAgain = vi.fn()
    render(<VoucherResult code="0000-0000" onScanAgain={onScanAgain} />)
    fireEvent.click(screen.getByRole('button', { name: /scan another card/i }))
    expect(onScanAgain).toHaveBeenCalledOnce()
  })

  it('renders the Copy button', () => {
    render(<VoucherResult code="0000-0000" onScanAgain={() => {}} />)
    expect(screen.getByRole('button', { name: /copy voucher code/i })).toBeInTheDocument()
  })
})
