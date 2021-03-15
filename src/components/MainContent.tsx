import React, { useContext } from "react";
import { CountdownProvider } from "../contexts/CountdownContext";
import { UserContext } from "../contexts/UserContext";
import { ChallengeBox } from "./ChallengeBox";
import { CompletedChallenges } from "./CompletedChallenges";
import { Countdown } from "./Countdown";
import { ExperienceBar } from "./ExperienceBar";
import Login from "./Login";
import { Profile } from "./Profile";

function MainContent() {
  const { isUserLoggedIn } = useContext(UserContext);

  return (
    <>
      {isUserLoggedIn ? (
        <>
          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
}

export default MainContent;
