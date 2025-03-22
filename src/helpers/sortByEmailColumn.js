export function sortByEmailColumn(dataToSort, sortByEmail) {
  return dataToSort.sort((a, b) => {
    if (sortByEmail === 'asc') {
      return a.email.localeCompare(b.email);
    } else if (sortByEmail === 'desc') {
      return b.email.localeCompare(a.email);
    }
    return 0;
  });
}
