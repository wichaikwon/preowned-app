"use client"
import React, { createContext } from "react"

interface NavbarContextProps {}

export const NavbarContext = createContext<NavbarContextProps>({})

interface NavbarProviderProps {
  children: React.ReactNode
}

export const NavbarContextProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  return (
    <NavbarContext.Provider value={{}}>
      <div className="sticky top-0 flex justify-between bg-black p-4 text-white sm:justify-center sm:gap-10">
        <h1>item1</h1>
        <h1>item2</h1>
        <h1 className="sm:hidden">item3</h1>
      </div>
      {children}
    </NavbarContext.Provider>
  )
}
