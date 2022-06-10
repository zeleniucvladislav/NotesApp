import { useModalContext } from "context/modal/modal.context";
import { useAxios } from "utils/hooks/useAxios";
import NoteForm from "shared/noteForm/noteForm";

import { ModalFields } from "types/modalFields.type";

import styles from "./noteModal.module.scss";
import { MdClear } from "react-icons/md";
import { useNotesContext } from "context/notes/notes.context";

const NoteModal = () => {
  const { handleVisibility } = useModalContext();
  const { fetchNotes } = useNotesContext();
  const { request } = useAxios();
  const defaultValues: ModalFields = {
    title: "",
    text: "",
    nonpublic: false,
  };

  const handleRequest = async (data: ModalFields) => {
    const res = await request("/api/notes/create", "POST", data);

    if (res) {
      fetchNotes();
      handleVisibility(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.form}>
          <button
            type="button"
            className={styles.form__clear}
            onClick={() => handleVisibility(false)}
          >
            <MdClear />
          </button>
          <NoteForm
            handleRequest={handleRequest}
            submitText="Post Note"
            defaultValues={defaultValues}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
