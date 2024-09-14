import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Providers from './Providers'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Youtube comment cleaner',
  description: 'To delete spam/scam comments',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
      </Providers>
    </html>
  )
}
