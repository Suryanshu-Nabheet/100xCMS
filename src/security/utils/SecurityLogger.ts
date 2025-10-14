// Security Logger
export class SecurityLogger {
  private static logs: string[] = []
  private static maxLogs = 1000
  
  static log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    const timestamp = new Date().toISOString()
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}`
    
    this.logs.push(logEntry)
    
    // Keep only recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(logEntry)
    }
  }
  
  static getLogs(): string[] {
    return [...this.logs]
  }
  
  static clearLogs(): void {
    this.logs = []
  }
  
  static exportLogs(): string {
    return this.logs.join('\n')
  }
}
