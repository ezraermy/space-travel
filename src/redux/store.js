import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './rockets/rocketsSlice';
// import categoriesReducer from './categories/categoriesSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    // categories: categoriesReducer,
  },
});

export default store;
