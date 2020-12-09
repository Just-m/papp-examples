import { createSelector } from 'reselect';

export const loginSelector = createSelector(
  (state) => state.login,
  (login) => login
);

export const tokenSelector = createSelector(
  loginSelector,
  (login) => login?.response?.token
  // (login) =>
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMTJSekVSenFMb0hBeDRuZ2VuU1pucWVVRDE5bkRKMjNxaWszMW1LWWpiS1g2dFVOQjVTVmpXOXVoUU5ySHZwd2ozZ3NpQUtwQ0FOMVh3a1RFMXJFVW44TFF1U21helNQeXVleVpDWSIsImV4cCI6MTYwODgwMDcyNSwiaWQiOjgwfQ.ra23FoBJnOUgkFncdYWHJ2fJ-mlQoHCpAxiIdzHX7Nw'
);

const login = {
  loginSelector,
  tokenSelector,
};

export default login;
