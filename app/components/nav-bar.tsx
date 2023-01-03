'use client'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import Spinner from './spinner'
import { useTheme } from 'next-themes'
import { SunIcon } from '@heroicons/react/24/solid'
import { MoonIcon } from '@heroicons/react/24/solid'

const NavBar = () => {
  const { data: session, status } = useSession()
  const { theme, setTheme } = useTheme()
  const loading = status === 'loading'

  const handleSetTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header>
      <nav className="flex flex-wrap items-center bg-gray-800 p-3 font-bold text-white">
        <Link href="/" className="mr-4 inline-flex items-center p-2">
          Home
        </Link>
        <Link href="/fetch-cc" className="mr-4 inline-flex items-center p-2">
          CC_Fetch
        </Link>
        <Link href="/fetch-sc" className="mr-4 inline-flex items-center p-2">
          SC_Fetch
        </Link>
        <Link href="/task-crud" className="mr-4 inline-flex items-center p-2">
          CRUD
        </Link>
        <div className="flex items-center ml-auto">
          {loading && <Spinner width="w-6" height="h-6" />}
          {session?.user ? (
            <>
              {session.user.image && (
                <span className="inline-block text-white">
                  <Image
                    className="mx-2 rounded-full"
                    alt="avatar"
                    src={session.user.image}
                    width={25}
                    height={25}
                  />
                </span>
              )}
              <span className="mx-2 font-normal">{session.user.name}</span>
              <button
                className="cursor-pointer font-normal text-indigo-500 hover:text-indigo-300"
                onClick={() => signOut()}
              >
                SignOut
              </button>
            </>
          ) : (
            <>
              <button
                className="cursor-pointer font-normal text-indigo-500 hover:text-indigo-300"
                onClick={() => signIn('github')}
              >
                SignIn GitHub
              </button>
            </>
          )}
          <div className="ml-3">
            <button
              className="block p-1 bg-black dark:bg-white rounded-full"
              onClick={handleSetTheme}
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5 text-white" />
              ) : (
                <SunIcon className="w-5 h-5 text-black" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
