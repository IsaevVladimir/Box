import React from 'react';

import FilterWrapper from "../../../components/Filter/LeftFilter/Wrapper";

import CategoryItem from "../../../components/Filter/LeftFilter/Items/CategoryItem";
import DateRangeItem from "../../../components/Filter/LeftFilter/Items/DateRangeItem";
import PriceItem from "../../../components/Filter/LeftFilter/Items/PriceItem";

const CheckFilter = () => {
  return (
    <FilterWrapper>
      <CategoryItem />
      <DateRangeItem />
      <PriceItem />
    </FilterWrapper>
  );
}

export default CheckFilter;
