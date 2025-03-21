import { useState } from 'react';
import styles from './ChildrenTable.module.css';

export default function ChildrenTable({ tableData }) {
  const [isActiveFilter, setIsActiveFilter] = useState(false);
  const dataForTitle = Object.keys(
    tableData.map(({ parentId, ...data }) => data)[0],
  );
  const activeFilterData = tableData.filter(user => user.isActive === true);

  function handleActiveFilter() {
    setIsActiveFilter(!isActiveFilter);
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th scope="col" className={styles.th}>
              {dataForTitle[0]}
            </th>
            <th scope="col" className={styles.th}>
              {dataForTitle[1]}
              <input
                type="checkbox"
                checked={isActiveFilter}
                onChange={handleActiveFilter}
                className={styles.checkbox}
              />
            </th>
            <th scope="col" className={styles.th}>
              {dataForTitle[2]}
            </th>
            <th scope="col" className={styles.th}>
              {dataForTitle[3]}
            </th>
            <th scope="col" className={styles.th}>
              {dataForTitle[4]}
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {!isActiveFilter &&
            tableData.map(({ id, isActive, balance, name, email }) => (
              <tr className={styles.tr}>
                <td className={styles.td}>{id}</td>
                <td className={styles.td}>{String(isActive)}</td>
                <td className={styles.td}>{balance}</td>
                <td className={styles.td}>{name}</td>
                <td className={styles.td}>{email}</td>
              </tr>
            ))}
          {isActiveFilter &&
            activeFilterData.map(({ id, isActive, balance, name, email }) => (
              <tr className={styles.tr}>
                <td className={styles.td}>{id}</td>
                <td className={styles.td}>{String(isActive)}</td>
                <td className={styles.td}>{balance}</td>
                <td className={styles.td}>{name}</td>
                <td className={styles.td}>{email}</td>
              </tr>
            ))}
          {isActiveFilter && activeFilterData.length === 0 && (
            <tr className={styles.tr}>
              <td
                colSpan={dataForTitle.length}
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
