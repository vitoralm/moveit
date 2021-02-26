import "../styles/global.css";

import { ChallengesProvider } from "../contexts/ChallengesContext";
import React, { useState } from "react";


function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
        <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp;

// equivale ao arquivo App.tsx que é disponibilizado no projeto react normal
