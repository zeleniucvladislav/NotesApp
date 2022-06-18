import { useState } from "react";
import NoteEdit from "./edit/noteEdit";
import NoteView from "./view/noteView";

import styles from "./noteWrapper.module.scss";

const NoteWrapper = () => {
  const [isEdit, setEdit] = useState<boolean>(false);

  return (
    <article className={styles.note}>
      {isEdit ? <NoteEdit setEdit={setEdit} /> : <NoteView setEdit={setEdit} />}
    </article>
  );
};

export default NoteWrapper;
