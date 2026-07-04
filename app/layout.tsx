import './globals.css'  // ← 'globals.css' (plural 's')
import ThemeProvider from '@/components/ThemeProvider'
import { ReactNode } from "react";

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo app with dark mode',
}
type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
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