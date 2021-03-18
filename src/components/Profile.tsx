import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { currentUser, logOut } = useContext(UserContext)

  return (
    <div className={styles.profileContainer}>
      <img src="pomo-user.png" alt="Profile image" />
      <div>
        <div className={styles.profileHeader}>
          <strong>{currentUser.name}</strong>
          <button className={styles.exitButton} onClick={logOut}>
            Sair
          </button>
        </div>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {currentUser.level}
        </p>
      </div>
    </div>
  );
}
