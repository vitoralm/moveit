import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { currentUser } = useContext(UserContext)
  return (
    <div className={styles.profileContainer}>
      <img src="pomo-user.png" alt="Profile image" />
      <div>
        <strong>{currentUser.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {currentUser.level}
        </p>
      </div>
    </div>
  );
}
