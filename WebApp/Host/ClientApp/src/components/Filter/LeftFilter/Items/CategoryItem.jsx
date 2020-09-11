import React from 'react';
import { Tree, Icon } from 'antd';

import ItemWrapper from './ItemWrapper';

const { TreeNode } = Tree;
import {listToTree} from '../../../../utils/tree';

const categories = [
  {
    Id: 1,
    Name: 'Category 1',
    ParentId: null
  },
  {
    Id: 2,
    Name: 'Category 2',
    ParentId: 1
  },
  {
    Id: 3,
    Name: 'Category 1',
    ParentId: 2
  }
];

const CategoryItem = ({ isCollapsed = false }) => {
  const treeData = listToTree(categories)

  const renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.Name} key={item.Id} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });
  };

  const itemContent = () => {
    return (
      <div>
        <span>Check categories:</span>
        <Tree
          checkable
        >
          {renderTreeNodes(treeData)}
        </Tree>
      </div>
    );
  }

  const minimalItemContent = () => {
    return <Icon type="calendar" />;
  }

  return <ItemWrapper isCollapsed={isCollapsed} renderItemContent={itemContent} renderMinimalItemContent={minimalItemContent} />
}

export default CategoryItem;
