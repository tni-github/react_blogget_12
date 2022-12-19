import { createSlice } from '@reduxjs/toolkit';
import { popularPostsRequestAsync } from './popularPostsAction';

const initialState = {
  postLoading: '',
  popularPosts: [],
  error: '',
  after: '',
  isLast: false,
  page: '',
};

export const popularPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
      state.after = '';
      state.isLast = false;
      state.popularPosts = [];
    },
  },
  extraReducers: {
    [popularPostsRequestAsync.pending.type]: (state) => {
      state.postLoading = 'loading';
      state.error = '';
    },
    [popularPostsRequestAsync.fulfilled.type]: (state, action) => {
      state.postLoading = 'loaded';
      state.popularPosts = [...state.popularPosts,
        ...action.payload.children];
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    [popularPostsRequestAsync.rejected.type]: (state, action) => {
      state.postLoading = 'error';
      state.error = action.payload.error;
    },
  },
});

export default popularPostsSlice.reducer;
