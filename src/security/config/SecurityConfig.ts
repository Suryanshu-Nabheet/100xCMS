// Security Configuration
export interface SecurityConfig {
  // DevTools Protection
  enableDevToolsDetection: boolean
  enableDevToolsBlocking: boolean
  devToolsDetectionInterval: number
  
  // Network Protection
  enableNetworkBlocking: boolean
  enableRequestMonitoring: boolean
  blockExternalRequests: boolean
  
  // Source Protection
  enableSourceBlocking: boolean
  enableCodeObfuscation: boolean
  enableMinification: boolean
  
  // Console Protection
  enableConsoleBlocking: boolean
  enableConsoleClearing: boolean
  consoleClearInterval: number
  
  // Debugging Protection
  enableDebuggerBlocking: boolean
  enableEvalBlocking: boolean
  enableFunctionBlocking: boolean
  
  // Password Protection
  enablePasswordValidation: boolean
  enablePasswordHashing: boolean
  passwordMinLength: number
  
  // Brute Force Protection
  enableBruteForceProtection: boolean
  maxLoginAttempts: number
  lockoutDuration: number
  
  // Scraping Protection
  enableScrapingProtection: boolean
  enableBotDetection: boolean
  enableRateLimiting: boolean
  
  // Hacking Protection
  enableXSSProtection: boolean
  enableCSRFProtection: boolean
  enableSQLInjectionProtection: boolean
  
  // Event Blocking
  enableRightClickBlocking: boolean
  enableKeyboardBlocking: boolean
  enableMouseBlocking: boolean
  enableTouchBlocking: boolean
  
  // API Blocking
  enableAPIBlocking: boolean
  enableFetchBlocking: boolean
  enableXHRBlocking: boolean
  
  // Storage Blocking
  enableStorageBlocking: boolean
  enableLocalStorageBlocking: boolean
  enableSessionStorageBlocking: boolean
  
  // DOM Blocking
  enableDOMBlocking: boolean
  enableQuerySelectorBlocking: boolean
  enableInnerHTMLBlocking: boolean
  
  // Crypto Blocking
  enableCryptoBlocking: boolean
  enableSubtleCryptoBlocking: boolean
  
  // Performance Blocking
  enablePerformanceBlocking: boolean
  enableTimingBlocking: boolean
  
  // Navigation Blocking
  enableNavigationBlocking: boolean
  enableHistoryBlocking: boolean
  enableLocationBlocking: boolean
  
  // Error Blocking
  enableErrorBlocking: boolean
  enableExceptionBlocking: boolean
  
  // Clipboard Blocking
  enableClipboardBlocking: boolean
  enableCopyBlocking: boolean
  enablePasteBlocking: boolean
  
  // File Access Blocking
  enableFileAccessBlocking: boolean
  enableDirectoryListing: boolean
}

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  // DevTools Protection
  enableDevToolsDetection: true,
  enableDevToolsBlocking: true,
  devToolsDetectionInterval: 100,
  
  // Network Protection
  enableNetworkBlocking: true,
  enableRequestMonitoring: true,
  blockExternalRequests: true,
  
  // Source Protection
  enableSourceBlocking: true,
  enableCodeObfuscation: true,
  enableMinification: true,
  
  // Console Protection
  enableConsoleBlocking: true,
  enableConsoleClearing: true,
  consoleClearInterval: 50,
  
  // Debugging Protection
  enableDebuggerBlocking: true,
  enableEvalBlocking: true,
  enableFunctionBlocking: true,
  
  // Password Protection
  enablePasswordValidation: true,
  enablePasswordHashing: true,
  passwordMinLength: 8,
  
  // Brute Force Protection
  enableBruteForceProtection: true,
  maxLoginAttempts: 5,
  lockoutDuration: 300000, // 5 minutes
  
  // Scraping Protection
  enableScrapingProtection: true,
  enableBotDetection: true,
  enableRateLimiting: true,
  
  // Hacking Protection
  enableXSSProtection: true,
  enableCSRFProtection: true,
  enableSQLInjectionProtection: true,
  
  // Event Blocking
  enableRightClickBlocking: true,
  enableKeyboardBlocking: true,
  enableMouseBlocking: true,
  enableTouchBlocking: true,
  
  // API Blocking
  enableAPIBlocking: true,
  enableFetchBlocking: true,
  enableXHRBlocking: true,
  
  // Storage Blocking
  enableStorageBlocking: true,
  enableLocalStorageBlocking: true,
  enableSessionStorageBlocking: true,
  
  // DOM Blocking
  enableDOMBlocking: true,
  enableQuerySelectorBlocking: true,
  enableInnerHTMLBlocking: true,
  
  // Crypto Blocking
  enableCryptoBlocking: true,
  enableSubtleCryptoBlocking: true,
  
  // Performance Blocking
  enablePerformanceBlocking: true,
  enableTimingBlocking: true,
  
  // Navigation Blocking
  enableNavigationBlocking: true,
  enableHistoryBlocking: true,
  enableLocationBlocking: true,
  
  // Error Blocking
  enableErrorBlocking: true,
  enableExceptionBlocking: true,
  
  // Clipboard Blocking
  enableClipboardBlocking: true,
  enableCopyBlocking: true,
  enablePasteBlocking: true,
  
  // File Access Blocking
  enableFileAccessBlocking: true,
  enableDirectoryListing: true,
}
