import '../styles/globals.css'
import React from 'react'
import MonitorSession from './components/monitor-session'
import NavBar from './components/nav-bar'
import Provider from './provider'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <Provider>
          <MonitorSession />
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
