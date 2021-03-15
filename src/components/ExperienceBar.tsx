import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
  const { currentUser, experienceToNextLevel } = useContext(UserContext);

  const percentToNextLevel = Math.round(currentUser.currentExperience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />
        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {currentUser.currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
