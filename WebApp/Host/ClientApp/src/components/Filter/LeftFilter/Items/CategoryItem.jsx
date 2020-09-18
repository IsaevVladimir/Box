import React, { useEffect } from 'react';
import { connect } from 'dva';
import {TreeSelect} from 'antd';

import ItemWrapper from '../ItemWrapper';

const {TreeNode} = TreeSelect;
import {listToTree} from '../../../../utils/tree';

const CategoryItem = ({ value, isCollapsed, form, list, fetchList}) => {

  useEffect(() => {
    fetchList();
  }, [])

  const treeData = listToTree(list)

  const renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} value={item.id}>
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
      fieldName='categories'
      valuePropName='value'
      label='Check categories:'
    >
      <TreeSelect
        treeCheckable
        showCheckedStrategy={TreeSelect.SHOW_PARENT}
        value={value}
      >
        {renderTreeNodes(treeData)}
      </TreeSelect>
    </ItemWrapper>
  );
}

export default connect(({ checkCategory }) => ({
  list: checkCategory.list
}), dispatch => ({
  fetchList: () => dispatch({type: 'checkCategory/fetch'})
}))(CategoryItem);
