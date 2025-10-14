'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Shield
} from 'lucide-react'
import { useAdminAuth } from './auth'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const { adminUser, logoutAdmin } = useAdminAuth()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Course Manager', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'admins', label: 'Admins', icon: Shield },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div>Dashboard Content</div>
      case 'courses':
        return <div>Course Manager Content</div>
      case 'students':
        return <div>Students Content</div>
      case 'admins':
        return <div>Admins Content</div>
      default:
        return children
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/5 backdrop-blur-sm border-r border-blue-500/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-blue-200 text-sm">CMS Management</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin info */}
          <div className="p-6 border-b border-blue-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">{adminUser?.name}</p>
                <p className="text-blue-200 text-sm">{adminUser?.email}</p>
                <span className={`px-2 py-1 rounded text-xs ${
                  adminUser?.role === 'super-admin' 
                    ? 'bg-red-500/20 text-red-200' 
                    : 'bg-blue-500/20 text-blue-200'
                }`}>
                  {adminUser?.role === 'super-admin' ? 'Super Admin' : 'Admin'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id)
                        setSidebarOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-6 border-t border-blue-500/20">
            <button
              onClick={logoutAdmin}
              data-admin-logout="true"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-200 hover:text-red-100 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-blue-500/20 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white/70 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-white capitalize">
                {menuItems.find(item => item.id === activeTab)?.label || 'Admin Panel'}
              </h2>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
