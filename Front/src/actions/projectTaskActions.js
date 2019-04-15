import axios from 'axios';
import { GET_ERRORS } from './types';

export const addPT = (project_task, history) => async dispatch => {
  try {
    await axios.post('http://localhost:8080/api/board', project_task);
    history.push('/'); // just back on projectBoard
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
