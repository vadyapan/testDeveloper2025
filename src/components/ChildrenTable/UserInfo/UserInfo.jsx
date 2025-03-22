import styles from './UserInfo.module.css';

export default function UserInfo({ id, isActive, balance, name, email }) {
  return (
    <tr>
      <td className={styles.td}>{id}</td>
      <td className={styles.td}>{String(isActive)}</td>
      <td className={styles.td}>{balance}</td>
      <td className={styles.td}>{name}</td>
      <td className={styles.td}>{email}</td>
    </tr>
  );
}
