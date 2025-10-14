'use client'
import { UltraSecureAdmin } from '../../components/Admin/UltraSecureAdmin'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black">
      <UltraSecureAdmin defaultTab="dashboard" />
    </div>
  )
}
