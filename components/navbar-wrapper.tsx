'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './navbar'

export function NavbarWrapper() {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'
  
  if (isLoginPage) return null
  return <Navbar />
}
