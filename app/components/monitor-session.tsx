'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const MonitorSession = () => {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    router.refresh()
  }, [session])

  return null
}

export default MonitorSession
