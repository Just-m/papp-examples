import { createSelector } from 'reselect';

export const preloadSelector = createSelector(
  (state) => state.preload,
  (preload) => preload
);

export const isPreloadedAppSelector = createSelector(
  preloadSelector,
  (preload) =>
    !!preload.preloaded &&
    !!preload.paymentAddress &&
    !!preload.deviceId &&
    !!preload.publicKey
);
