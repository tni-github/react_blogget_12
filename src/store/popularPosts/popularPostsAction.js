import { URL_API } from '../../api/const';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const popularPostsRequestAsync = createAsyncThunk(
  'posts/fetch',
  (newPage, { getState }) => {
    const page = newPage ? newPage : getState().posts.page;

    const token = getState().tokenReducer.token;
    const after = getState().posts.after;
    const isLast = getState().posts.isLast;

    if (!token || isLast) return;

    return axios(
      `${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(({ data }) => data.data)
      .catch((err) => {
        console.error(err);
        return ({ err: err.toString() });
      });
  },
);
