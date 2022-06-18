import React from "react";
import moment from "moment";
import { BsXLg, BsPencilFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa";

import { useAxios } from "utils/hooks/useAxios";
import { useEditContext } from "context/edit/edit.context";

import styles from "./noteView.module.scss";

type Props = {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoteView = ({ setEdit }: Props) => {
  const { request } = useAxios();
  const { note, fetchNotes } = useEditContext();

  const { _id, title, text, created_at } = note;

  const handleDeleteNote = async (id: string) => {
    await request("/api/manage/delete", "DELETE", { noteId: id });
    await fetchNotes();
  };

  const truncatedText =
    text.length > 650 ? `${text.substring(0, 650)}...` : text;

  return (
    <>
      <div className={styles.buttons}>
        <button className={styles.edit} onClick={() => setEdit(true)}>
          <BsPencilFill size={12} />
        </button>
        <button className={styles.delete} onClick={() => handleDeleteNote(_id)}>
          <BsXLg size={12} />
        </button>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{truncatedText}</p>
      <div className={styles.footer}>
        <FaClock />
        {moment(created_at).format("Do MMMM YYYY")}
      </div>
    </>
  );
};

export default NoteView;
