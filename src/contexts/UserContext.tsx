import React, { useEffect } from "react"
import { createContext, useState, ReactNode } from "react"
import User from "../types/models/User"
import { useCookies } from "react-cookie"

interface UserProviderProps {
  children: ReactNode
  isUserLoggedIn: boolean
  userToken: string
  currentUser: User
}

interface UserContextData {
  isUserLoggedIn: boolean
  userToken: string
  currentUser: User
  logIn: (userToken: string, user: User) => void
  logOut: () => void
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children, ...props }: UserProviderProps) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    props.isUserLoggedIn || false
  )
  const [userToken, setUserToken] = useState(props.userToken || "")
  const [currentUser, setCurrentUser] = useState(
    props.currentUser || ({} as User)
  )
  const [cookies, setCookie] = useCookies([
    "userToken",
    "currentUser",
    "isUserLoggedIn",
  ])

  useEffect(() => {
    setCookie("userToken", userToken, { path: "/" })
    setCookie("currentUser", currentUser, { path: "/" })
    setCookie("isUserLoggedIn", isUserLoggedIn, { path: "/", maxAge: 86400 })

  }, [isUserLoggedIn, userToken, currentUser])

  function logIn(userToken: string, user: User) {
    setUserToken(userToken)
    setCurrentUser(user)
    setIsUserLoggedIn(true)
  }

  function logOut() {
    setIsUserLoggedIn(false)
  }

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        userToken,
        currentUser,
        logIn,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
