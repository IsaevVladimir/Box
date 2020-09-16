import React from 'react';
import { connect } from 'dva';
import {Tree} from 'antd';

import ItemWrapper from './ItemWrapper';

const {TreeNode} = Tree;
import {listToTree} from '../../../../utils/tree';

const CategoryItem = ({isCollapsed, form, list}) => {
  const treeData = listToTree(list)

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

  return (
    <ItemWrapper
      isCollapsed={isCollapsed}
      form={form}
      iconType='calendar'
      initialValue={0}
      fieldName='categoryId'
      valuePropName='value'
      label='Check categories:'
    >
      <Tree
        checkable
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </ItemWrapper>
  );
}

export default connect(({ checkCategory }) => ({
  list: checkCategory.list
}))(CategoryItem);
