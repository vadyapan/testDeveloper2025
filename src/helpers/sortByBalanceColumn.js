import { parseBalance } from './parseBalance';

export function sortByBalanceColumn(dataToSort, sortByBalance) {
  return dataToSort.sort((a, b) => {
    const balanceA = parseBalance(a.balance);
    const balanceB = parseBalance(b.balance);

    if (sortByBalance === 'asc') {
      return balanceA - balanceB;
    } else if (sortByBalance === 'desc') {
      return balanceB - balanceA;
    }
    return 0;
  });
}
