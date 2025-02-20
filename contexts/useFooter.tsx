"use client"
import { createContext } from "react"

interface FooterContextProps {}

export const FooterContext = createContext<FooterContextProps>({})

interface FooterProviderProps {
  children: React.ReactNode
}

export const FooterContextProvider: React.FC<FooterProviderProps> = ({ children }) => {
  return <FooterContext.Provider value={{}}>{children}</FooterContext.Provider>
}
