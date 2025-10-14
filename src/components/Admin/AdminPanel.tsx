'use client'
import { AdminGuard } from './AdminGuard'
import { AdminDashboard } from './dashboard'

export function AdminPanel() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-black">
        <AdminDashboard />
      </div>
    </AdminGuard>
  )
}
