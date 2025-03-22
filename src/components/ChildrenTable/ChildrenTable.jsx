import { useEffect, useState } from 'react';
import UserInfo from './UserInfo/UserInfo';
import SortIcon from '../../icons/SortIcon';
import { sortByBalanceColumn } from '../../helpers/sortByBalanceColumn';
import { sortByEmailColumn } from '../../helpers/sortByEmailColumn';
import { ASC, DESC, NONE } from '../../constants/table';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import ArrowUpIcon from '../../icons/ArrowUpIcon';
import styles from './ChildrenTable.module.css';

export default function ChildrenTable({ tableData }) {
  const [isActiveFilter, setIsActiveFilter] = useState(false);
  const [sortedData, setSortedData] = useState(tableData);
  const [sortByBalance, setSortByBalance] = useState(NONE);
  const [sortByEmail, setSortByEmail] = useState(NONE);

  const columnTitles = Object.keys(
    tableData.map(({ parentId, ...data }) => data)[0],
  );
  const activeFilterData = tableData.filter(user => user.isActive === true);

  function handleActiveFilter() {
    setIsActiveFilter(!isActiveFilter);
  }

  function handleSort(setSortBy) {
    if (setSortBy === setSortByBalance) setSortByEmail(NONE);
    if (setSortBy === setSortByEmail) setSortByBalance(NONE);

    setSortBy(prevOrder => {
      if (prevOrder === NONE) return ASC;
      if (prevOrder === ASC) return DESC;
      return NONE;
    });
  }

  useEffect(() => {
    const dataToSort = isActiveFilter ? activeFilterData : tableData;
    let newSortedData = [...dataToSort];

    if (sortByBalance !== NONE) {
      sortByBalanceColumn(newSortedData, sortByBalance);
    } else if (sortByEmail !== NONE) {
      sortByEmailColumn(newSortedData, sortByEmail);
    }

    setSortedData(newSortedData);
  }, [tableData, isActiveFilter, activeFilterData, sortByBalance, sortByEmail]);

  const getSortIcon = sortOrder => {
    return (
      (sortOrder === ASC && <ArrowUpIcon />) ||
      (sortOrder === DESC && <ArrowDownIcon />) ||
      (sortOrder === NONE && <SortIcon />)
    );
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th scope="col" className={styles.th}>
              {columnTitles[0]}
            </th>
            <th scope="col" className={styles.th}>
              <div className={styles.activeColumn}>
                {columnTitles[1]}
                <input
                  type="checkbox"
                  checked={isActiveFilter}
                  onChange={handleActiveFilter}
                  className={styles.checkbox}
                />
              </div>
            </th>
            <th scope="col" className={styles.th}>
              <div className={styles.activeColumn}>
                {columnTitles[2]}
                <button
                  className={styles.button}
                  onClick={() => handleSort(setSortByBalance)}
                >
                  {getSortIcon(sortByBalance)}
                </button>
              </div>
            </th>
            <th scope="col" className={styles.th}>
              {columnTitles[3]}
            </th>
            <th scope="col" className={styles.th}>
              {columnTitles[4]}
              <button
                className={styles.button}
                onClick={() => handleSort(setSortByEmail)}
              >
                {getSortIcon(sortByEmail)}
              </button>
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {sortedData.map(({ id, isActive, balance, name, email }) => (
            <UserInfo
              key={id}
              id={id}
              isActive={isActive}
              balance={balance}
              name={name}
              email={email}
            />
          ))}
          {isActiveFilter && activeFilterData.length === 0 && (
            <tr className={styles.tr}>
              <td
                colSpan={columnTitles.length}
                className={styles.td}
                style={{ textAlign: 'center' }}
              >
                No active users
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
