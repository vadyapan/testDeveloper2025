import { ASC, DESC } from '../constants/table';

export function sortByEmailColumn(dataToSort, sortByEmail) {
  dataToSort.sort((a, b) => {
    if (sortByEmail === ASC) {
      return a.email.localeCompare(b.email);
    } else if (sortByEmail === DESC) {
      return b.email.localeCompare(a.email);
    }
    return 0;
  });
}
