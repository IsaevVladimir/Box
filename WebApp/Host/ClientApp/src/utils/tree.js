export const listToTree = (list, idPropName = 'Id', parentIdPropName = 'ParentId') => {
  let map = {}, node, roots = [], i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i][idPropName]] = i;
    list[i].children = [];
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node[parentIdPropName] !== null && node[parentIdPropName] !== '0') {
      list[map[node[parentIdPropName]]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};
