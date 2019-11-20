import instance from '../axios-instance';
import * as actionTypes from './actionTypes';

export const updateList = (newList) => ({
  type: actionTypes.UPDATE_LIST,
  transList: newList,
});

export const fetchList = () => (dispatch) => {
  instance
    .get('v1/transactions')
    .then((res) => {
      dispatch(updateList(res.data.results));
    })
    .catch((err) => console.log(err));
};
/* export const fetchList = () => (dispatch) => {
  instance
    .get('transactions')
    .then((res) => {
      dispatch(updateList(res.data));
    })
    .catch((err) => console.log(err));
}; */
