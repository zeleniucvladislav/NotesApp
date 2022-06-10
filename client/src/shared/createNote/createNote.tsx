import { useModalContext } from "context/modal/modal.context";

import { HiPlus } from "react-icons/hi";
import styles from "./createNote.module.scss";

const CreateNote = () => {
  const { handleVisibility } = useModalContext();

  return (
    <button className={styles.createBtn} onClick={() => handleVisibility(true)}>
      <HiPlus />
    </button>
  );
};

export default CreateNote;
