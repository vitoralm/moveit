import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import styles from "../styles/components/Login.module.css"

function Login() {
  const { logIn } = useContext(UserContext)
  const [loginAttemptFailed, setLoginAttemptFailed] = useState(false)

  const authUser = async (event) => {
    event.preventDefault()
    const userName = event.target.username.value
    const userPassword = event.target.password.value
    const res = await fetch("/api/users/signin", {
      body: JSON.stringify({
        username: userName,
        password: userPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    const result = await res.json()
    if (res.status === 200) {
      const userToken = result.token
      const user = result.user.data
      logIn(userToken, user)
    } else if (res.status === 401) {
      setLoginAttemptFailed(true)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.rightContent}>
        <img src="icons/big-logo.svg" alt="Move.it" />
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

          <form className={styles.form} onSubmit={authUser}>
            <div className={styles.userData}>
              <input
                name="username"
                type="text"
                placeholder="Digite seu username"
              />
              <input
                name="password"
                type="password"
                placeholder="Digite sua senha"
                autoFocus
              />
              <button type="submit">
                <img src="icons/login-arrow.svg" alt="Login" />
              </button>
            </div>
          </form>
          {loginAttemptFailed && (
            <div className={styles.invalidUserData}>
              <span>Usuário e/ou senha inválido(s)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
