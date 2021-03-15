import "../styles/global.css";

import React from "react";


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

// equivale ao arquivo App.tsx que é disponibilizado no projeto react normal
