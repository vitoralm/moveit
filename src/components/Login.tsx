import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Login.module.css";

function Login() {
    const { logIn } = useContext(ChallengesContext)

  return (
    <div className={styles.container}>
      <div className={styles.rightContent}>
        <img src="icons/big-logo.svg" alt="Move.it"/>
      </div>

      <div className={styles.leftContent}>
        <div className={styles.authentication}>
          <div className={styles.logoContainer}>
            <img src="icons/logo.svg" alt="move.it" />
          </div>
          <h2>Bem-vindo</h2>
          <div className={styles.loginDetails}>
            <img src="icons/github.svg" alt="Github" />
            <p>Faça login com o seu Github para começar</p>
          </div>
          <div className={styles.userData}>
              <input type="text" placeholder="Digite seu username"/>
              <button 
                type="button"
                onClick={logIn}>
                  <img src="icons/login-arrow.svg" alt="Login"/>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
