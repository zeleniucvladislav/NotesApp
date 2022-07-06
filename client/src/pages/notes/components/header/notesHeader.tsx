import { CreateNote } from "shared";

import styles from "./notesHeader.module.scss";

type Options = {
  value: string;
  label: string;
};

type Props = {
  handleChangeSelect: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
};

const NotesHeader = ({ handleChangeSelect }: Props) => {
  const options: Options[] = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Personal",
      value: "personal",
    },
  ];

  return (
    <header className={styles.header}>
      <h1>Recent notes</h1>
      <div className={styles.header_right}>
        <select onChange={handleChangeSelect} className={styles.header_select}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <CreateNote />
      </div>
    </header>
  );
};

export default NotesHeader;
