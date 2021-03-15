import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges() {
  const { currentUser } = useContext(UserContext)
  return (
    <div className={styles.completedChallengesContainer}>
      <span> Desafios completos</span>
      <span>{currentUser.challengesCompleted}</span>
    </div>
  );
}
