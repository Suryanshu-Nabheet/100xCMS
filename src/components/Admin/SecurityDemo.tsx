'use client'
import { SecureAdmin } from './SecureAdmin'

export function SecurityDemo() {
  return (
    <div className="min-h-screen bg-black">
      <SecureAdmin defaultTab="dashboard" />
    </div>
  )
}
