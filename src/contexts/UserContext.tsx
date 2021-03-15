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
  const [currentUser, setCurrentUser] = useState(
    props.currentUser || ({} as User)
  )

  const [level, setLevel] = useState(currentUser.level ? currentUser.level : 1)
  const [currentExperience, setCurrentExperience] = useState(
    currentUser.currentExperience ? currentUser.currentExperience : 0
  )
  const [challengesCompleted, setChallengesCompleted] = useState(
    currentUser.challengesCompleted ? currentUser.challengesCompleted : 0
  )
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false)
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
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

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(level + 1)
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

  function completeChallenge() {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
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
