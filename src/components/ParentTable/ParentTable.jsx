import { useState } from 'react';
import groupedUserInfo from '../../helpers/groupedUserInfo';
import useFetchUserInfo from '../../hooks/useFetchUserInfo';
import styles from './ParentTable.module.css';
import ChildrenTable from '../ChildrenTable/ChildrenTable';

export default function ParentTable() {
  const [userInfo, loading, error] = useFetchUserInfo();
  const [openChildrenTable, setOpenChildrenTable] = useState({});

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loading}>
          <h4>Loading...</h4>
        </div>
      </div>
    );
  }

  if (error) {
    <div className={styles.wrapper}>
      <div className={styles.error}>
        <h4>Error: {error.message}</h4>
      </div>
    </div>;
  }

  function handleChildrenTable(parentId) {
    setOpenChildrenTable(prevState => ({
      ...prevState,
      [parentId]: !prevState[parentId],
    }));
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <tbody className={styles.tbody}>
          {groupedUserInfo(userInfo).map(user => (
            <tr key={user.parentId}>
              <td className={styles.td}>
                <div
                  className={styles.row}
                  onClick={() => handleChildrenTable(user.parentId)}
                >
                  <div>Table {user.parentId}</div>
                  {!openChildrenTable[user.parentId] && <div>↓</div>}
                  {openChildrenTable[user.parentId] && <div>↑</div>}
                </div>
                {openChildrenTable[user.parentId] && (
                  <ChildrenTable tableData={user.children} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
