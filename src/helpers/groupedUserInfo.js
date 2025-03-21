export default function groupedUserInfo(userInfo) {
  const groupedData = userInfo.reduce((acc, item) => {
    if (!acc[item.parentId]) {
      acc[item.parentId] = [];
    }

    acc[item.parentId].push(item);
    return acc;
  }, {});

  const result = Object.keys(groupedData).map(key => ({
    parentId: key,
    children: groupedData[key],
  }));

  return result;
}
