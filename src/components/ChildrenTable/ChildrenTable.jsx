import styles from './ChildrenTable.module.css';

export default function ChildrenTable({ tableData }) {
  const dataForTitle = tableData.map(({ parentId, ...data }) => data)[0];

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {Object.keys(dataForTitle).map(title => (
              <th key={title} scope="col" className={styles.th}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {tableData.map(({ id, isActive, balance, name, email }) => (
            <tr className={styles.tr}>
              <td className={styles.td}>{id}</td>
              <td className={styles.td}>{String(isActive)}</td>
              <td className={styles.td}>{balance}</td>
              <td className={styles.td}>{name}</td>
              <td className={styles.td}>{email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
