'use client'
import { useEffect, ReactNode } from 'react'
import { DevToolsBlocker } from '../modules/DevToolsBlocker'
import { NetworkProtector } from '../modules/NetworkProtector'
import { SourceProtector } from '../modules/SourceProtector'
import { ConsoleBlocker } from '../modules/ConsoleBlocker'
import { DebuggingBlocker } from '../modules/DebuggingBlocker'
import { PasswordProtector } from '../modules/PasswordProtector'
import { BruteForceProtector } from '../modules/BruteForceProtector'
import { ScrapingProtector } from '../modules/ScrapingProtector'
import { HackingProtector } from '../modules/HackingProtector'
import { EventBlocker } from '../modules/EventBlocker'
import { APIBlocker } from '../modules/APIBlocker'
import { StorageBlocker } from '../modules/StorageBlocker'
import { DOMBlocker } from '../modules/DOMBlocker'
import { CryptoBlocker } from '../modules/CryptoBlocker'
import { PerformanceBlocker } from '../modules/PerformanceBlocker'
import { NavigationBlocker } from '../modules/NavigationBlocker'
import { ErrorBlocker } from '../modules/ErrorBlocker'
import { ClipboardBlocker } from '../modules/ClipboardBlocker'
import { FileAccessBlocker } from '../modules/FileAccessBlocker'
import { SecurityConfig } from '../config/SecurityConfig'
import { SecurityLogger } from '../utils/SecurityLogger'

interface SecurityManagerProps {
  children: ReactNode
}

export function SecurityManager({ children }: SecurityManagerProps) {
  useEffect(() => {
    // Initialize security system
    SecurityLogger.log('Security system initialized')
    
    // Apply all security measures
    DevToolsBlocker.initialize()
    NetworkProtector.initialize()
    SourceProtector.initialize()
    ConsoleBlocker.initialize()
    DebuggingBlocker.initialize()
    PasswordProtector.initialize()
    BruteForceProtector.initialize()
    ScrapingProtector.initialize()
    HackingProtector.initialize()
    EventBlocker.initialize()
    APIBlocker.initialize()
    StorageBlocker.initialize()
    DOMBlocker.initialize()
    CryptoBlocker.initialize()
    PerformanceBlocker.initialize()
    NavigationBlocker.initialize()
    ErrorBlocker.initialize()
    ClipboardBlocker.initialize()
    FileAccessBlocker.initialize()
    
    SecurityLogger.log('All security modules activated')
    
    return () => {
      // Cleanup on unmount
      SecurityLogger.log('Security system cleanup')
    }
  }, [])

  return <>{children}</>
}
