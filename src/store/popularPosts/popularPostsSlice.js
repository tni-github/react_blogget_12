import { createSlice } from '@reduxjs/toolkit';

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
    postsRequest: (state) => {
      state.postLoading = 'loading';
      state.error = '';
    },
    postsRequestSuccess: (state, action) => {
      state.postLoading = 'loaded';
      state.popularPosts = action.payload.children;
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    postsRequestSuccessAfter: (state, action) => {
      state.postLoading = 'loaded';
      state.popularPosts =
        [...state.popularPosts, ...action.payload.children];
      state.error = '';
      state.after = action.payload.after;
      state.isLast = !action.payload.after;
    },
    postsRequestError: (state, action) => {
      state.postLoading = 'error';
      state.error = action.error;
    },
    changePage: (state, action) => {
      state.page = action.payload;
      state.after = '';
      state.isLast = false;
    },
  },
  extraReducers: {},
});

export default popularPostsSlice.reducer;
