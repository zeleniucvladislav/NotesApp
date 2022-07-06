import { createContext, useContext } from "react";

type NotesType = {
  fetchNotes: (page: number) => Promise<void>;
};

export const NotesContext = createContext<NotesType>({
  fetchNotes: async () => {},
});

export const useNotesContext = () => useContext(NotesContext);
