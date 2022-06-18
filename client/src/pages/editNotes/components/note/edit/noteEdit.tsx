import React from "react";
import NoteForm from "shared/noteForm/noteForm";
import { useAxios } from "utils/hooks/useAxios";

import { ModalFields } from "types/modalFields.type";
import { useEditContext } from "context/edit/edit.context";
import { MdClear } from "react-icons/md";

import styles from "./noteEdit.module.scss";

type Props = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoteEdit = ({ setEdit }: Props) => {
  const { request } = useAxios();
  const { note, fetchNotes } = useEditContext();

  const { _id, title, text, nonpublic } = note;

  const defaultValues: ModalFields = {
    title: title,
    text: text,
    nonpublic: nonpublic,
  };

  const handleRequest = async (data: ModalFields) => {
    const res = await request("/api/manage/edit", "PUT", {
      noteId: _id,
      note: data,
    });

    if (res) {
      await fetchNotes();
      setEdit(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.clear}
        onClick={() => setEdit(false)}
      >
        <MdClear />
      </button>
      <NoteForm
        handleRequest={handleRequest}
        submitText="Edit Note"
        defaultValues={defaultValues}
      />
    </>
  );
};

export default NoteEdit;
