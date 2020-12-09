import { ENVS } from '@configs';
import * as CONSTANST from './constant';

export const createTreasureScan = async (token, huntTreasureItem) => {
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(huntTreasureItem),
  };
  return fetch(
    `${ENVS.REACT_APP_BASE_API}/${CONSTANST.TREASURE_SCAN}`,
    parameters
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};

export const getListTreasureItemService = (token) => {
  var apiurl = `${ENVS.REACT_APP_BASE_API}/unknow/${CONSTANST.TREASURE_LIST}`;
  var parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token != null) {
    apiurl = `${ENVS.REACT_APP_BASE_API}/${CONSTANST.TREASURE_LIST}`;
    parameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return fetch(apiurl, parameters)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};
