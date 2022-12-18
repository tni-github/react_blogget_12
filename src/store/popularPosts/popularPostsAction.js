import { URL_API } from '../../api/const';
import axios from 'axios';
import { popularPostsSlice } from './popularPostsSlice';

export const popularPostsRequestAsync = (newPage) => (dispatch, getState) => {
  let page = getState().posts.page;

  if (newPage) {
    page = newPage;
    dispatch(popularPostsSlice.actions.changePage(page));
  }

  const token = getState().tokenReducer.token;
  const after = getState().posts.after;
  const postLoading = getState().posts.postLoading;
  const isLast = getState().posts.isLast;

  if (!token || postLoading === 'loading' || isLast) return;

  dispatch(popularPostsSlice.actions.postsRequest());

  axios(`${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
    .then(({ data }) => {
      if (after) {
        dispatch(
          popularPostsSlice.actions.postsRequestSuccessAfter(data.data)
        );
      } else {
        dispatch(
          popularPostsSlice.actions.postsRequestSuccess(data.data)
        );
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(
        popularPostsSlice.actions.postsRequestError({ err: err.toString() }));
    });
};
