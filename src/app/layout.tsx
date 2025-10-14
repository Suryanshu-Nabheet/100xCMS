import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SecurityManager } from '../security'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ultra Secure CMS',
  description: 'A completely secure content management system with maximum protection against inspection',
  keywords: 'CMS, secure, content management, ultra secure, protected',
  authors: [{ name: 'Suryanshu Nabheet' }],
  robots: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#000000',
  colorScheme: 'dark',
  other: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ultra Secure CMS" />
        <meta name="application-name" content="Ultra Secure CMS" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="none" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <SecurityManager>
          {children}
        </SecurityManager>
      </body>
    </html>
  )
}
