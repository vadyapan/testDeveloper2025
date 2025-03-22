import { parseBalance } from './parseBalance';
import { ASC, DESC } from '../constants/table';

export function sortByBalanceColumn(dataToSort, sortByBalance) {
  dataToSort.sort((a, b) => {
    const balanceA = parseBalance(a.balance);
    const balanceB = parseBalance(b.balance);

    if (sortByBalance === ASC) {
      return balanceA - balanceB;
    } else if (sortByBalance === DESC) {
      return balanceB - balanceA;
    }
    return 0;
  });
}
