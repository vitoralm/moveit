import React, { useEffect } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { CookiesProvider } from "react-cookie"
import styles from "../styles/pages/Home.module.css"
import { ChallengesProvider } from "../contexts/ChallengesContext"
import MainContent from "../components/MainContent"
import { UserProvider } from "../contexts/UserContext"
import User from "../types/models/User"

interface HomeProps {
  isUserLoggedIn: boolean
  userToken: string
  currentUser: User
}

export default function Home(props: HomeProps) {
  return (
    <CookiesProvider>
      <UserProvider
        isUserLoggedIn={props.isUserLoggedIn}
        userToken={props.userToken}
        currentUser={props.currentUser}
      >
        <ChallengesProvider>
          <div className={styles.container}>
            <Head>
              <title>Home | move.it</title>
            </Head>
            <MainContent />
          </div>
        </ChallengesProvider>
      </UserProvider>
    </CookiesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    isUserLoggedIn,
    userToken,
    currentUser,
  } = ctx.req.cookies
  let _currentUser; try { _currentUser  = JSON.parse(currentUser)} catch(err) { _currentUser = null }
  return {
    props: {
      isUserLoggedIn: Boolean(isUserLoggedIn === "true"),
      userToken: userToken ? String(userToken) : null,
      currentUser: _currentUser
    },
  }
}
