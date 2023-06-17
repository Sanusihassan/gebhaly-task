import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cart',
  description: 'View Cart Items',
}
import { _Provider } from '../Redux/Provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <_Provider>
          {children}
        </_Provider>
      </body>
    </html>
  )
}
