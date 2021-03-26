import React, { useEffect } from "react"
import { createContext, useState, ReactNode } from "react"
import User from "../types/models/User"
import { useCookies } from "react-cookie"
import challenges from "../../challenges.json"
import { LevelUpModal } from "../components/LevelUpModal"

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
  experienceToNextLevel: number
  activeChallenge: Challenge
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
  closeLevelUpModal: () => void
  logIn: (userToken: string, user: User) => void
  logOut: () => void
}

interface Challenge {
  type: "body" | "eye"
  description: string
  amount: number
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children, ...props }: UserProviderProps) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    props.isUserLoggedIn || false
  )
  const [userToken, setUserToken] = useState(props.userToken || "")
  const [currentUser, setCurrentUser] = useState(  props.currentUser || {} as User )
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false)
  const experienceToNextLevel = Math.pow((currentUser.level + 1) * 4, 2)
  const [cookies, setCookie, removeCookie] = useCookies([
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
    removeCookie("userToken", { path: "/" })
    removeCookie("currentUser", { path: "/" })
    removeCookie("isUserLoggedIn", { path: "/" })
    setIsUserLoggedIn(false)
    setCurrentUser({} as User)
    setUserToken(null)
  }

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    currentUser.level++
    setIsLevelModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)

    new Audio("/notification.mp3").play()

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount} xp!`,
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  async function syncRemoteUser(user : User) {
    const userBody = JSON.stringify({
      currentExperience: user.currentExperience,
      challengesCompleted: user.challengesCompleted,
      level: user.level
    })
    const reqHeaders= {
      "Content-Type": "application/json",
      "x-acess-token": userToken
    }
    const url =  "/api/users/" + user.id
    const res = await fetch(url, {
      body: userBody,
      headers: reqHeaders,
      method: "POST"
    })
    const updatedUser = await res.json()
    console.log("updatedUser", updatedUser)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge
    let finalExperience = currentUser.currentExperience + amount
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    currentUser.currentExperience = finalExperience
    setActiveChallenge(null)
    currentUser.challengesCompleted++
    syncRemoteUser(currentUser)
  }

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        userToken,
        currentUser,
        experienceToNextLevel,
        activeChallenge,
        logIn,
        logOut,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </UserContext.Provider>
  )
}
