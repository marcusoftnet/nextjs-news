import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/paginator.module.css';

const Paginator = ({ pageNumber }) => {
  const router = useRouter();

  const handlePrevious = (pageNumber) => {
    if (pageNumber > 1) navigateToPage(pageNumber - 1);
  };

  const handleNext = (pageNumber) => {
    if (pageNumber < 5) navigateToPage(pageNumber + 1);
  };

  const navigateToPage = (newPageNumber) => {
    router.push(`/feed/${newPageNumber}`).then(() => window.scrollTo(0, 0));
  };

  return (
    <div className={styles.paginator}>
      <div
        onClick={() => handlePrevious(pageNumber)}
        className={pageNumber === 1 ? styles.disabled : styles.active}
      >
        Previous page
      </div>
      <div># {pageNumber}</div>
      <div
        onClick={() => handleNext(pageNumber)}
        className={pageNumber === 5 ? styles.disabled : styles.active}
      >
        Next page
      </div>
    </div>
  );
};

export default Paginator;
