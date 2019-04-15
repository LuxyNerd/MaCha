import axios from 'axios';

export const addPT = (project_task, history) => async dispatch => {
  await axios.post('http://localhost:8080/api/board', project_task);
  history.push('/'); // just back on folder
};
