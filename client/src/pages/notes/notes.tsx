import { useEffect, useState, useCallback } from "react";

import { NotesList, Loader } from "shared";
import { NotesHeader, NoteModal } from "./components";
import { NotesType } from "types/notes.type";

import { useAxios } from "utils/hooks/useAxios";
import { useModalContext } from "context/modal/modal.context";

import styles from "./notes.module.scss";
import { NotesContext } from "context/notes/notes.context";

const Notes = () => {
  const [notes, setNotes] = useState<NotesType[]>([]);
  const [notesType, setNotesType] = useState<string>("all");
  const { request, loading } = useAxios();
  const { isVisible } = useModalContext();

  const fetchNotes = useCallback(async () => {
    const url = notesType === "all" ? "/api/notes/all" : "/api/notes/personal";
    const res: any = await request(url, "GET");
    const links = res?.links || [];
    setNotes(links);
  }, [notesType, request]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const options = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Personal",
      value: "personal",
    },
  ];

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

      <NotesHeader options={options} handleChangeSelect={handleChangeSelect} />
      {loading ? <Loader /> : <NotesList notes={notes} />}
    </div>
  );
};

export default Notes;
