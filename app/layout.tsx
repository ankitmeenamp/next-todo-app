import './globals.css'  // ← 'globals.css' (plural 's')
import ThemeProvider from '@/components/ThemeProvider'

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo app with dark mode',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}