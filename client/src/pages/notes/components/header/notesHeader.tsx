import { CreateNote } from "shared";

import styles from "./notesHeader.module.scss";
import NotesSelectOptions from "./notesHeaderOptions";

type Props = {
  handleChangeSelect: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
};

const NotesHeader = ({ handleChangeSelect }: Props) => {
  return (
    <header className={styles.header}>
      <h1>Recent notes</h1>
      <div className={styles.header_right}>
        <select onChange={handleChangeSelect} className={styles.header_select}>
          <NotesSelectOptions />
        </select>
        <CreateNote />
      </div>
    </header>
  );
};

export default NotesHeader;
