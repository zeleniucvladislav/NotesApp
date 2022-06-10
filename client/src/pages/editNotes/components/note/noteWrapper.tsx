import { useState } from "react";
import NoteEdit from "./noteEdit";
import NoteView from "./noteView";

import styles from "./editNote.module.scss";

const NoteWrapper = () => {
  const [isEdit, setEdit] = useState<boolean>(false);

  return (
    <article className={styles.note}>
      {isEdit ? <NoteEdit setEdit={setEdit} /> : <NoteView setEdit={setEdit} />}
    </article>
  );
};

export default NoteWrapper;
