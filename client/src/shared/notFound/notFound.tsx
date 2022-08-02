import { Link } from "react-router-dom";
import { GiSadCrab } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

import styles from "./notFound.module.scss";

type Props = {
  text?: string;
};

const NotFound = ({
  text = "Ooops! Looks like this page doesn't exist",
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <GiSadCrab size={200} />
      <p>{text}</p>
      <Link to="/">
        <button className={styles.homepage_btn}>
          GO TO HOMEPAGE <FaHome />
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
