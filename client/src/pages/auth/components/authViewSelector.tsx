import { Dispatch, SetStateAction } from "react";
import styles from "../auth.module.scss";

type Props = {
  loginSelected: boolean;
  setLoginSelected: Dispatch<SetStateAction<boolean>>;
};

export const AuthViewSelector = ({
  loginSelected,
  setLoginSelected,
}: Props) => {
  return (
    <div className={styles.selector}>
      <button
        onClick={() => setLoginSelected(true)}
        className={`${styles.button} ${
          loginSelected ? styles.button_active : styles.button_inactive
        }`}
      >
        Log in
      </button>
      <button
        onClick={() => setLoginSelected(false)}
        className={`${styles.button} ${
          !loginSelected ? styles.button_active : styles.button_inactive
        }`}
      >
        Register
      </button>
    </div>
  );
};
