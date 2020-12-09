export const getEnvs = () => {
  let envs = {
    REACT_APP_MODE: 'production',
    REACT_APP_TOKEN_VOTE_ID:
      '75cf855c0a3e29ced4224ec78f48c79f4dff4504bf01d9669eda62eafaea6bd7',
    REACT_APP_BASE_API: 'https://api-hunt-staging.incognito.org/api',
    REACT_APP_CHAIN_URL: 'https://testnet.incognito.org/fullnode',
    REACT_APP_IS_DEV: 'false',
    isDev: false,
    REACT_APP_RECAPCHA: '',
  };
  for (const [key, value] of Object.entries(process.env)) {
    if (!!value) {
      envs[key] = value;
    }
  }
  envs.isDev = envs.REACT_APP_IS_DEV === 'true';
  return envs;
};

export const ENVS = getEnvs();
