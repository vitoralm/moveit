import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext'
import { UserContext } from '../contexts/UserContext';
import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(UserContext)
  const { currentUser } = useContext(UserContext)
  return (
    <div className={styles.completedChallengesContainer}>
      <span> Desafios completos</span>
      <span>{currentUser.challengesCompleted}</span>
    </div>
  );
}
