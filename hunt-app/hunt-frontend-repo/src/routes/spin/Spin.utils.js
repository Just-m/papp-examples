import moment from 'moment';

export const STATUS_PENDING = 'Spinning';
export const STATUS_PROCESSING = 'Processing';
export const STATUS_SUCCESS = 'Complete';
export const STATUS_TX_NOT_FOUND = 'Tx not found';
export const STATUS_SPIN_AGAIN = 'Spin again';

export const STATUS = {
  0: STATUS_PENDING,
  1: STATUS_PROCESSING,
  2: STATUS_SUCCESS,
  3: STATUS_SPIN_AGAIN,
  4: STATUS_TX_NOT_FOUND,
};

export const STATUS_COLOR = {
  0: '#5995F0',
  1: '#F7B500',
  2: '#6DD400',
  3: '#FA6400',
};

export const REWARD_NAME = {
  0: '',
  1: '0.1 XMR',
  2: '1 BTC Lotto',
  3: '',
  4: '10 PRV',
  5: 'One year VPN',
  6: '1 BTC Lotto',
  7: '',
  8: '1 PRV',
  9: 'Node',
  10: '0.001 BTC',
  11: '',
  12: '2 PRV',
  13: '1 BTC Lotto',
  14: '0.01 XMR',
  15: '',
  16: '3 PRV',
};

export const FEE_PRV_PER_TX = 70000000;

export const MAX_SPIN_TIMES = 20;

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatDateTime = (dateTime, formatPattern) =>
  moment(dateTime).format(formatPattern || 'DD.MM hh:mm');

export const ellipsisCenter = ({ str = '', limit = 10, dots = '...' } = {}) => {
  try {
    const size = str.length;
    if (size < limit * 2 + dots.length) {
      return str;
    }
    const leftStr = str.substring(0, limit);
    const rightStr = str.substring(size - limit, size);
    return leftStr + dots + rightStr;
  } catch {
    return str;
  }
};

export const getRadTurn = (reward = 1) => {
  const totalReward = 16;
  const degOneReward = 360 / totalReward;
  const index = (reward - 1) * degOneReward;
  const randd = index / 360;
  return randd;
};

export const getDefaultFailRandd = () => {
  const failRewards = Object.entries(REWARD_NAME)
    .filter(([key, value]) => value === '' && key !== '0')
    .map(([key, value]) => key);
  const randomFailReward = Math.floor(Math.random() * failRewards.length);
  const reward = failRewards[randomFailReward];
  const defaultRandd = getRadTurn(reward);
  return defaultRandd;
};

export const getRandRewardFail = () => {
  const factories = [
    `“Worrying about losing<br />keeps you winning.”<p class='text medium-text'><i>Nelson Moss, Sweet November</i></p>`,//
    `You’ll get there. <br />It just takes practice. Keep at it!`, //
    `“Ask yourself one question:<br />‘Do I feel lucky?’ Well, do ya punk?”<p class='text medium-text'><i>Clint Eastwood, Dirty Harry</i></p>`, //
    `“What is life if not a gamble?”<br /><p class='text medium-text'><i>F.E. Higgins, The Black Book of Secrets</i></p>`, //
    `‘I find your lack of faith disturbing.’<p class='text medium-text'><i>Darth Vader</i></p>`,//
    `“I’m not superstitious,<br />but I am a little stitious.”<p class='text medium-text'><i>Michael Scott, The Office</i></p>`, //
    `“You miss 100% of the shots<br />you don’t take.”<p class='text medium-text'><i>Wayne Gretzky</i></p>`, //
    `Sorry, no dice.`, //
    `Close, but no cigar. Or Prize. <p class='text medium-text'> Give it another go!</p>`, //
    `Shoot, and it was<br />so close too!`, //
  ];
  return factories[Math.floor(Math.random() * factories.length)];
};
