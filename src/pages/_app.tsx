import "../styles/global.css";

import { ChallengesProvider } from "../contexts/ChallengesContext";
import React, { useState } from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

// equivale ao arquivo App.tsx que é disponibilizado no projeto react normal
