import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import { Loader, NotFound } from "shared";
import { useAxios } from "utils/hooks/useAxios";
import { NotesType } from "types/notes.type";

import styles from "./note.module.scss";

export const Note = () => {
  const [note, setNote] = useState<NotesType>();
  const { request, loading } = useAxios();

  let { id } = useParams();

  const fetchNote = useCallback(async () => {
    const res: any = await request(`/api/notes/${id}`, "GET");
    if (res) {
      setNote(res);
    }
  }, [request, id]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  if (loading) {
    return <Loader />;
  }

  if (!note) {
    return <NotFound text="Ooops! Looks like this note doesn't exist" />;
  }

  return (
    <article className={styles.note}>
      <h1 className={styles.note_title}>{note?.title}</h1>
      <h2>
        Created by
        <span className={styles.note_creator}>{note?.creator?.username}</span>
      </h2>
      <p className={styles.note_text}>{note?.text}</p>
      <div className={styles.note_footer}>
        Posted on {moment(note?.created_at).format("Do MMMM YYYY")}
      </div>
    </article>
  );
};

export default Note;
