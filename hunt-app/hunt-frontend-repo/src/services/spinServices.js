import { ENVS } from '@configs';

export const getAddress = async (token) => {
  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${ENVS.REACT_APP_BASE_API}/address`, parameters)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};

export const getHistory = async (token) => {
  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${ENVS.REACT_APP_BASE_API}/spin`, parameters)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.Data;
    });
};

export const getResultByTxId = (token, tx) => {
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tx: tx?.txId }),
  };
  return fetch(`${ENVS.REACT_APP_BASE_API}/spin`, parameters)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};

export const spinTheWheel = (token, tx) => {
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tx: tx?.txId }),
  };
  return fetch(`${ENVS.REACT_APP_BASE_API}/spin`, parameters)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};

export const getSpinBoard = (token) => {
  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${ENVS.REACT_APP_BASE_API}/spin/board`, parameters)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};
