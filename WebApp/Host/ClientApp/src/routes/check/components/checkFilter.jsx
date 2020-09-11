import React from 'react';

import FilterWrapper from "../../../components/Filter/LeftFilter/Wrapper";

import CategoryItem from "../../../components/Filter/LeftFilter/Items/CategoryItem";
import DateRangeItem from "../../../components/Filter/LeftFilter/Items/DateRangeItem";
import PriceItem from "../../../components/Filter/LeftFilter/Items/PriceItem";

const CheckFilter = () => {
  const isCollapsed = false;

  return (
    <FilterWrapper>
      <CategoryItem isCollapsed={isCollapsed} />
      <DateRangeItem isCollapsed={isCollapsed} />
      <PriceItem isCollapsed={isCollapsed} />
    </FilterWrapper>
  );
}

export default CheckFilter;
