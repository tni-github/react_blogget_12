import { tokenReducer, tokenMiddleware } from './tokenReducer';
import { userCommentReducer } from './userCommentReducer';
import { authReducer } from './auth/authReducer';
import commentsReducer from './comments/commentsSlice';
import { configureStore } from '@reduxjs/toolkit';
import popularPostsReducer from './popularPosts/popularPostsSlice';

export const store = configureStore({
  reducer: {
    tokenReducer,
    userCommentReducer,
    posts: popularPostsReducer,
    auth: authReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware),
});

