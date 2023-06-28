/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import shortid from 'shortid';
import styles from '../../components/Users/Users.module.css';

type Props = {
  totalCount: number,
  userCount: number,
  onCurrentPage?: (PageNumber: number) => void ,
  currentPage: number,
  portionSize?: number,
}
const Paginator: React.FC<Props> = ({
  totalCount,
  userCount,
  onCurrentPage,
  currentPage,
  portionSize = 10,
}) => {
  const pageCount = Math.ceil(totalCount / userCount);
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);

  }

  let portionCount = Math.ceil(pageCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionNumber = portionNumber * portionSize;

  return (
    <section style={{'display': 'inline-block'}}>
       <div className={styles.pagination}>
      {portionNumber > 1 && (
        <span onClick={() => setPortionNumber(portionNumber - 1)}>
          &laquo;
        </span>
        )}
        
      {pages.filter(page => page >= leftPortionNumber && page <= rightPortionNumber).map(page => {
        return (
          <span key={shortid.generate()}
            className={currentPage === page ? styles.active : undefined}
            onClick={() => (onCurrentPage !== undefined && onCurrentPage(page))}
          >
            {page}
          </span>
        );
      })}
      {portionCount > portionNumber && (
        <span onClick={() => setPortionNumber(portionNumber + 1)}>
         &raquo;
        </span>
      )}
    </div>
    </section>
   
  );
};

export default Paginator;
