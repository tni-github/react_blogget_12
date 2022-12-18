import { URL_API } from '../../api/const';
import axios from 'axios';
import { deleteToken } from '../tokenReducer';
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
        dispatch(popularPostsSlice.actions.postsRequestSuccessAfter(data.data));
      } else {
        dispatch(popularPostsSlice.actions.postsRequestSuccess(data.data));
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(deleteToken());
      dispatch(
        popularPostsSlice.actions.postsRequestError({ err: err.toString() }));
    });
};

// import { URL_API } from '../../api/const';
// import axios from 'axios';
// import { deleteToken } from '../tokenReducer';

// export const POSTS_REQUEST = 'POSTS_REQUEST';
// export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
// export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
// export const POSTS_REQUEST_SUCCESS_AFTER = 'POSTS_REQUEST_SUCCESS_AFTER';
// export const CHANGE_PAGE = 'CHANGE_PAGE';

// export const postsRequest = () => ({
//   type: POSTS_REQUEST,
// });

// export const postsRequestSuccess = (data) => ({
//   type: POSTS_REQUEST_SUCCESS,
//   popularPosts: data.children,
//   after: data.after,
// });

// export const postsRequestSuccessAfter = (data) => ({
//   type: POSTS_REQUEST_SUCCESS_AFTER,
//   popularPosts: data.children,
//   after: data.after,
// });

// export const postsRequestError = (error) => ({
//   type: POSTS_REQUEST_ERROR,
//   error,
//   popularPosts: [],
// });

// export const changePage = (page) => ({
//   type: CHANGE_PAGE,
//   page,
// });

// export const popularPostsRequestAsync = (newPage) => (dispatch, getState) =>
// {
//   let page = getState().posts.page;

//   if (newPage) {
//     page = newPage;
//     dispatch(changePage(page));
//   }

//   const token = getState().tokenReducer.token;
//   const after = getState().posts.after;
//   const postLoading = getState().posts.postLoading;
//   const isLast = getState().posts.isLast;

//   if (!token || postLoading === 'loading' || isLast) return;

//   dispatch(postsRequest());

//   axios(`${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`, {
//     headers: {
//       Authorization: `bearer ${token}`,
//     },
//   })
//     .then(({ data }) => {
//       if (after) {
//         dispatch(postsRequestSuccessAfter(data.data));
//       } else {
//         dispatch(postsRequestSuccess(data.data));
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       dispatch(deleteToken());
//       dispatch(postsRequestError(err.toString()));
//     });
// };

