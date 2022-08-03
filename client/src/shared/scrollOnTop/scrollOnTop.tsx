import { useState, useEffect } from "react";
import { BsArrowBarUp } from "react-icons/bs";

import styles from "./scrollOnTop.module.scss";

const ScrollOnTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    window.scrollY > window.innerHeight ? setVisible(true) : setVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) {
    return <></>;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <button
          onClick={scrollToTop}
          style={{
            opacity: visible ? "100%" : "0%",
          }}
          className={styles.btn}
        >
          <BsArrowBarUp className={styles.btn_icon} />
        </button>
      </div>
    </div>
  );
};

export default ScrollOnTop;
