'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Provider
