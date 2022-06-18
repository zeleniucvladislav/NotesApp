import { useEffect, useState, useCallback } from "react";
import { EditHeader, NoteWrapper } from "./components";
import { Loader, NoNotes } from "shared";

import { EditNoteContext } from "context/edit/edit.context";
import { useAxios } from "utils/hooks/useAxios";
import { NotesType } from "types/notes.type";

import styles from "./notesEdit.module.scss";

const NotesEdit = () => {
  const [notes, setNotes] = useState<NotesType[]>([]);
  const { request, loading } = useAxios();

  const fetchNotes = useCallback(async () => {
    const res: any = await request("/api/manage", "GET");
    const links = res?.links || [];
    setNotes(links);
  }, [request]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <EditHeader />
      {notes?.length > 0 ? (
        <section className={styles.notes}>
          {notes.map((note: NotesType) => {
            return (
              <EditNoteContext.Provider
                value={{ note, fetchNotes }}
                key={note._id}
              >
                <NoteWrapper />
              </EditNoteContext.Provider>
            );
          })}
        </section>
      ) : (
        <NoNotes />
      )}
    </div>
  );
};

export default NotesEdit;
