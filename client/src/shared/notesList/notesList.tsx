import moment from "moment";
import { FaUser, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NoNotes } from "shared";
import { NotesType } from "types/notes.type";

import styles from "./notesList.module.scss";

type Props = {
  notes: NotesType[];
};

const NotesList = ({ notes }: Props) => {
  const truncate = (text: string, id: string) => {
    return text.length > 650 ? (
      <>
        {text.substring(0, 650)}...
        <Link
          to={`/notes/${id}`}
          target="_blank"
          className={styles.note_redirect}
        >
          Read more
        </Link>
      </>
    ) : (
      text
    );
  };

  if (notes?.length <= 0) {
    return <NoNotes />;
  }

  return (
    <section className={styles.notes}>
      {notes.map((note: NotesType) => {
        return (
          <article className={styles.note} key={note._id}>
            <h2 className={styles.note_header}>{note.title}</h2>
            <p className={styles.note_text}>{truncate(note.text, note._id)}</p>
            <div className={styles.note_footer}>
              <span>
                <FaClock />
                {moment(note.created_at).format("Do MMMM YYYY")}
              </span>
              <span>
                <FaUser /> {note.creator?.username}
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default NotesList;
