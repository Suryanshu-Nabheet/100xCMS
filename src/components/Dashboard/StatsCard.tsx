import React from 'react'
import { DivideIcon as LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  gradient: string
  change?: {
    value: string
    trend: 'up' | 'down'
  }
  onClick?: () => void
}

export function StatsCard({ title, value, subtitle, icon: Icon, gradient, change, onClick }: StatsCardProps) {
  return (
    <div
      className={`liquid-glass rounded-professional p-4 sm:p-6 hover-lift group transition-enhanced ${onClick ? 'cursor-pointer hover:border-blue-400/30' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
            <p className="text-white/70 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{title}</p>
            <p className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-300 transition-colors duration-300">
            {value}
          </p>
          {subtitle && (
              <p className="text-white/60 text-xs sm:text-sm">{subtitle}</p>
          )}
        </div>
          <div className={`p-3 sm:p-4 rounded-professional bg-gradient-to-r ${gradient} group-hover:scale-110 transition-all duration-300 glow-blue shadow-lg`}>
          <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
        </div>
      </div>
      
      {change && (
        <div className="mt-3 sm:mt-4 flex items-center pt-2 sm:pt-3 border-t border-white/10">
          <span className={`text-xs sm:text-sm font-medium ${
              change.trend === 'up' ? 'text-blue-300' : 'text-blue-400'
          }`}>
            {change.trend === 'up' ? '↗' : '↘'} {change.value}
          </span>
            <span className="text-white/50 text-[10px] sm:text-xs ml-2">vs last month</span>
        </div>
      )}
    </div>
  )
}