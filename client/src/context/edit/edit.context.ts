import { createContext, useContext } from "react";
import { NotesType } from "types/notes.type";

type EditNoteType = {
  note: NotesType;
  fetchNotes: () => Promise<void>;
};

export const EditNoteContext = createContext<EditNoteType>({
  note: { _id: "", title: "", text: "", created_at: "", nonpublic: false },
  fetchNotes: async () => {},
});

export const useEditContext = () => useContext(EditNoteContext);
