"use client"
import { useRouter } from "next/navigation"
import React, { createContext } from "react"

interface NavbarContextProps {}

export const NavbarContext = createContext<NavbarContextProps>({})

interface NavbarProviderProps {
  children: React.ReactNode
}

export const NavbarContextProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const router = useRouter()
  return (
    <NavbarContext.Provider value={{}}>
      <div className="sticky top-0 flex justify-between bg-black p-4 text-white sm:justify-center sm:gap-10">
        <button onClick={() => router.push("/")}>HOME</button>
        <h1 className="sm:hidden">LOGIN</h1>
      </div>
      {children}
    </NavbarContext.Provider>
  )
}
