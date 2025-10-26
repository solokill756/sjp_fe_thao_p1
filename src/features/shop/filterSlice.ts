import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Filters } from '../../config/shop/shopConfig';

const initialState: Filters = {
  price: { min: null, max: null },
  categories: [],

  status: { inStock: false, onSale: false },
};

const shopSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filters>) => {
      return { ...state, ...action.payload };
    },

    resetFilters: () => {
      return initialState;
    },
    addCategoryFilter: (state, action: PayloadAction<number>) => {
      if (!state.categories) {
        state.categories = [];
      }
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
  },
});

export const { setFilters, resetFilters, addCategoryFilter } =
  shopSlice.actions;
export default shopSlice.reducer;
