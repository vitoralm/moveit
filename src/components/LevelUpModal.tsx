import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal() {
  const { currentUser, closeLevelUpModal } = useContext(UserContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{currentUser.level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="icons/close.svg" alt="Fechar modal" />
        </button>
      </div>
    </div>
  );
}
