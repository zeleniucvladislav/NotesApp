import { useEffect, memo } from "react";
import { ImArrowRight2, ImArrowLeft2 } from "react-icons/im";

import styles from "./pagesBar.module.scss";

type Props = {
  totalPages: number;
  notesType?: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const PagesBar = ({
  totalPages,
  notesType,
  currentPage,
  setCurrentPage,
}: Props) => {
  useEffect(() => {
    //refresh paging state when modifiyng notes type
    setCurrentPage(1);
  }, [notesType, setCurrentPage]);

  const handlePrevious = () => {
    if (currentPage === 1) return currentPage;

    const targetedPage = currentPage - 1;
    setCurrentPage(targetedPage);
  };

  const handleNext = () => {
    if (currentPage === totalPages) return currentPage;

    const targetedPage = currentPage + 1;
    setCurrentPage(targetedPage);
  };
  return (
    <div className={styles.wrapper}>
      <button onClick={handlePrevious} className={styles.button}>
        <ImArrowLeft2 size={20} />
      </button>
      <div className={styles.page}>{currentPage}</div>
      <button onClick={handleNext} className={styles.button}>
        <ImArrowRight2 size={20} />
      </button>
    </div>
  );
};
export default memo(PagesBar);
