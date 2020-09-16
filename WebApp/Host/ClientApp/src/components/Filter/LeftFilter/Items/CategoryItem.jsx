import React from 'react';
import { connect } from 'dva';
import {TreeSelect} from 'antd';

import ItemWrapper from './ItemWrapper';

const {TreeNode} = TreeSelect;
import {listToTree} from '../../../../utils/tree';

const CategoryItem = ({isCollapsed, form, list}) => {
  const treeData = listToTree(list)

  const renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.Name} key={item.Id} value={item.Id}>
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
      <TreeSelect
        treeCheckable
        showCheckedStrategy={TreeSelect.SHOW_PARENT}
      >
        {renderTreeNodes(treeData)}
      </TreeSelect>
    </ItemWrapper>
  );
}

export default connect(({ checkCategory }) => ({
  list: checkCategory.list
}))(CategoryItem);
