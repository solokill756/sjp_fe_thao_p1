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
  },
});

export const { setFilters, resetFilters } = shopSlice.actions;
export default shopSlice.reducer;
