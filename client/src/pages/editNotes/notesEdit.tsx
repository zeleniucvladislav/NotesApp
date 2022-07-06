import { useEffect, useState, useCallback } from "react";
import { EditHeader, NoteWrapper } from "./components";
import { Loader, NoNotes, PagesBar } from "shared";

import { EditNoteContext } from "context/edit/edit.context";
import { useAxios } from "utils/hooks/useAxios";
import { NotesPaginationType } from "types/notesPagination.type";
import { NotesType } from "types/notes.type";

import styles from "./notesEdit.module.scss";

const NotesEdit = () => {
  const [notes, setNotes] = useState<NotesPaginationType>({
    list: [],
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { request, loading } = useAxios();

  const fetchNotes = useCallback(
    async (page: number = currentPage) => {
      const res: any = await request(`/api/manage?page=${page}`, "GET");
      const { totalPages, notes: list } = res;

      setNotes({ list, totalPages });

      if (currentPage > totalPages && totalPages > 1) {
        setCurrentPage(totalPages);
      }
    },
    [request, currentPage]
  );

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const NotesMap = () => {
    return notes.list?.length > 0 ? (
      <section className={styles.notes}>
        {notes.list.map((note: NotesType) => {
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
    );
  };

  return (
    <div>
      <EditHeader />
      {loading ? <Loader /> : <NotesMap />}
      {notes.totalPages > 1 && (
        <PagesBar
          totalPages={notes.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default NotesEdit;
