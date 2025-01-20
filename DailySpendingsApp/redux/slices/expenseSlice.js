import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    list: [],
  },
  reducers: {
    setExpenses(state, action) {
      state.list = action.payload;
    },
    addExpense(state, action) {
      state.list.push(action.payload);
    },
  },
});

export const { setExpenses, addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
