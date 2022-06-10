import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./editHeader.module.scss";

export const EditHeader = () => {
  return (
    <header className={styles.header}>
      <h1>Posted Notes</h1>
      <Link to="/">
        <button className={styles.header_btn}>
          <FaHome />
        </button>
      </Link>
    </header>
  );
};

export default EditHeader;
