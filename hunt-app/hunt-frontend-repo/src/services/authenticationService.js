import { ENVS } from '@configs';
import * as CONSTANT from './constant';

export const loginUserService = (request) => {
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request.user),
  };
  return fetch(`${ENVS.REACT_APP_BASE_API}/${CONSTANT.AUTH_PATH}`, parameters)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};
