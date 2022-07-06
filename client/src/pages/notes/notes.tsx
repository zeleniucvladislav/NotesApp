import { useEffect, useState, useCallback } from "react";

import { NotesHeader, NoteModal } from "./components";
import { NotesList, Loader, PagesBar } from "shared";
import { NotesPaginationType } from "types/notesPagination.type";

import { useAxios } from "utils/hooks/useAxios";
import { useModalContext } from "context/modal/modal.context";
import { NotesContext } from "context/notes/notes.context";

import styles from "./notes.module.scss";

const Notes = () => {
  const [notes, setNotes] = useState<NotesPaginationType>({
    list: [],
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { request, loading } = useAxios();
  const { isVisible } = useModalContext();
  const [notesType, setNotesType] = useState<string>("all");

  const fetchNotes = useCallback(
    async (page: number = currentPage) => {
      const url =
        notesType === "all"
          ? `/api/notes/all?page=${page}`
          : `/api/notes/personal?page=${page}`;

      const res: any = await request(url, "GET");

      if (res) {
        const { totalPages, notes: list } = res;

        setNotes({ list, totalPages });

        if (currentPage > totalPages && totalPages > 1) {
          setCurrentPage(totalPages);
        }
      }
    },
    [notesType, request, currentPage]
  );

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleChangeSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setNotesType(evt.target.value);
  };

  return (
    <div className={styles.container}>
      {isVisible && (
        <NotesContext.Provider value={{ fetchNotes }}>
          <NoteModal />
        </NotesContext.Provider>
      )}
      <NotesHeader handleChangeSelect={handleChangeSelect} />
      {loading ? <Loader /> : <NotesList notes={notes.list} />}
      {notes.totalPages > 1 && (
        <PagesBar
          totalPages={notes.totalPages}
          notesType={notesType}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Notes;
