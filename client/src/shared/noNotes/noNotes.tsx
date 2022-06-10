import React from "react";
import { ImSad } from "react-icons/im";

import styles from "./noNotes.module.scss";

const NoNotes = () => {
  return (
    <section className={styles.container}>
      <ImSad size={110} />
      <p>No posted notes yet</p>
    </section>
  );
};

export default NoNotes;
