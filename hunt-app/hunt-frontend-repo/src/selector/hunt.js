import { createSelector } from 'reselect';

export const huntSelector = createSelector(
  (state) => state.hunt,
  (hunt) => hunt
);

export const qrcodeSelector = createSelector(
  huntSelector,
  (hunt) => hunt?.qrcode
);

export const huntDataSelector = createSelector(
  huntSelector,
  (hunt) => hunt?.data
);
