import React from 'react';
import { ClaimStyled, InfoStyled, Styled } from './Spin.styled';
import spinwheel from '@assets/Wheel/wheel.png';
import spinpoint from '@assets/Wheel/pin_wheel.png';
import spinbtn from '@assets/Wheel/spinBtn.png';
import srcInfo from '@assets/icons/icon_info.png';
import srcBox from '@assets/icons/icon_box.png';
import withLayout from '@components/Layout';
import withSpin from './Spin.enhance';
import {
  actionChangeTimesSpin,
  actionSetErrorSpinTimes,
  spinDataSelector,
  spinSelector,
  totalSpinFeePRVSelector,
} from './Spin.reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  ellipsisCenter,
  formatDateTime,
  getRandRewardFail,
  MAX_SPIN_TIMES,
  REWARD_NAME,
} from './Spin.utils';
import srcBitcoin from '@assets/icons/icon_bitcoin.png';
import srcArrowRight from '@assets/icons/icon_arrow_right.png';
import copy from 'copy-to-clipboard';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isInteger, isNaN, toNumber } from 'lodash';

const SpinWheel = React.memo((props) => {
  const { rotate, startSpin } = props;
  return (
    <div className='spin-container'>
      <img
        className='spin-point'
        src={spinpoint}
        alt=''
        style={{ marginTop: '20px' }}
      />
      <img
        className={`spin-coin
          ${rotate ? 'spin-rotate' : ''}
         `}
        id='wheel'
        src={spinwheel}
        alt=''
      />
      <img className='spin-btn' src={spinbtn} alt='' onClick={startSpin} />
    </div>
  );
});

export const Info = React.memo(
  withLayout(() => {
    const infoFactories = [
      {
        title: 'LOTTO',
        desc: 'An entry to the final 1 BTC draw at the end of the game',
        link:
          'https://we.incognito.org/t/quest-documentation-wheel-and-lottery/7955',
        linkDesc: 'More on the BTC draw',
      },
      {
        title: 'NODE',
        desc:
          'The Incognito Node device. Use it to pay for your Node in the Power tab.',
        link: 'https://we.incognito.org/t/node/338',
        linkDesc: 'More on Node',
      },
      {
        title: 'PRV',
        desc: 'Incognito’s native cryptocurrency.',
        link: 'https://we.incognito.org/t/prv-holders/792',
        linkDesc: 'More on PRV',
      },
      {
        title: 'BTC',
        desc: 'The original cryptocurrency.',
      },
      {
        title: 'XMR',
        desc: 'The biggest privacy coin.',
      },
      {
        title: '1 Year VPN',
        desc: 'A coupon for a 1 year subscription to ExpressVPN.',
      },
    ];
    const renderItem = (item) => {
      const { title, desc, link = '', linkDesc = '' } = item;
      return (
        <div className='info-item'>
          <p className='text medidum-text'>
            <b>{title}</b> - {desc}
          </p>
          {!!link && (
            <a href={link} className='text medium-text'>
              {linkDesc}
              <img
                src={srcArrowRight}
                alt=''
                style={{
                  width: '6px',
                  height: '11px',
                  marginLeft: '5px',
                  marginBottom: '2.5px',
                }}
              />
            </a>
          )}
        </div>
      );
    };
    return (
      <InfoStyled className='info'>
        <p className='text prize'>Prizes</p>
        {infoFactories.map((item) => renderItem(item))}
      </InfoStyled>
    );
  })
);

const LeaderboardItem = (props) => {
  const { name = '', lastWin = '', wins = 0, isTableHead } = props;
  const history = useHistory();
  const handleClick = () => history.push('/spin/info');
  if (!!isTableHead) {
    return (
      <div className='leaderboard-item'>
        <p className='text bold-text prize'>
          Prize
          <img
            onClick={handleClick}
            src={srcInfo}
            alt='info-icon'
            className='info-icon'
          />
        </p>
        <p className='text medium-text'>Won</p>
        <p className='text medium-text'>Last won</p>
      </div>
    );
  }
  return (
    <div className='leaderboard-item'>
      <p className='text bold-text'>{name}</p>
      <p className='text medium-text'>{wins}</p>
      <p className='text medium-text'>
        {lastWin ? formatDateTime(lastWin) : '-'}
      </p>
    </div>
  );
};

const LeaderBoard = React.memo((props) => {
  const spin = useSelector(spinSelector);
  const leaderBoard = spin?.board?.Leaderboard || [];
  if (!leaderBoard) {
    return null;
  }
  return (
    <div className='leaderboard'>
      <LeaderboardItem isTableHead={true} />
      {leaderBoard.map((item) => (
        <LeaderboardItem key={item?.id} {...item} />
      ))}
    </div>
  );
});

const Reward1 = React.memo((props) => {
  const { reward } = props;
  return (
    <div className='reward reward-1'>
      <p>{`Wowza. You won ${REWARD_NAME[reward]}!`}</p>
      <p>Your balance will update in a couple of minutes.</p>
    </div>
  );
});

const Reward2 = () => {
  return (
    <div className='reward reward-2'>
      <p
        className='text bold-text'
        dangerouslySetInnerHTML={{
          __html: getRandRewardFail(),
        }}
      ></p>
    </div>
  );
};

const Reward3 = React.memo((props) => {
  const { reward } = props;
  return (
    <div className='reward reward-3'>
      <p>{`Wowza. You won ${REWARD_NAME[reward]}!`}</p>
      <p>Wait a couple of minutes for your balance to update.</p>
    </div>
  );
});

const Reward4 = React.memo(() => {
  return (
    <div className='reward reward-4'>
      <p>You won a Node!</p>
      <p>
        <Link to='/spin/claim-node'>Follow these instructions ></Link>
      </p>
    </div>
  );
});

const Reward5 = React.memo(() => {
  return (
    <div className='reward reward-5'>
      <p>You won a 1 year VPN!</p>
      <p>
        <Link to='/spin/claim-vpn'>Follow these instructions ></Link>
      </p>
    </div>
  );
});

const Reward6 = React.memo(() => {
  return (
    <div className='reward reward-6'>
      <p>
        You scored a LOTTO ticket to the 1 BTC draw!
        <a href='https://we.incognito.org/t/a-better-prize-wheel-26-november/7729'>
          <b>{` More info`}</b>
        </a>
        <br />
        <br />
        To see your balance, add LOTTO to your coin list in the Assets tab.
      </p>
    </div>
  );
});

export const ClaimNode = React.memo(
  withLayout(() => {
    const factories = [
      '1. Go to Assets and add NODE to your list. Refresh to see your balance.',
      `2. Go to the Power tab, and tap "Get a Node device".`,
      '3. Enter your details and select NODE as the payment currency.',
      '4. Get ready to power the network!',
    ];
    return (
      <ClaimStyled>
        <p>Here’s how to claim your Node.</p>
        {factories.map((item) => (
          <p>{item}</p>
        ))}
      </ClaimStyled>
    );
  })
);

export const ClaimVPN = React.memo(
  withLayout(() => {
    const factories = [
      `1. Go to Assets and add VPN to your list. Refresh to see your balance.`,
      `2. Send the VPN token (VPN) you received to this address: <br>${ellipsisCenter(
        {
          str:
            '12S42hZoS4dcbyV1a2V3iU73g4RhqrT3G4yQEPrR5NdFnb3KK3j5fN6n2bvkN6Jz5DJj1LL4qp7bTridFMX5wkT99QbAajg2cxuFSkM',
          limit: 5,
        }
      )}</br>`,
      `3. In the memo field, include either your email address or telegram handle. This is very important!`,
      '4. We will reach to you to get the ball rolling.',
    ];
    return (
      <ClaimStyled>
        <p className='text bold-text'>Here’s how to claim your VPN.</p>
        {factories.map((item, index) => (
          <p
            className='text medium-text'
            dangerouslySetInnerHTML={{
              __html: item,
            }}
            onClick={() => {
              if (index === 0) {
                alert('Copied');
                copy(
                  '12S42hZoS4dcbyV1a2V3iU73g4RhqrT3G4yQEPrR5NdFnb3KK3j5fN6n2bvkN6Jz5DJj1LL4qp7bTridFMX5wkT99QbAajg2cxuFSkM'
                );
              }
            }}
          ></p>
        ))}
      </ClaimStyled>
    );
  })
);

const Intro = () => {
  const dispatch = useDispatch();
  const spinPRVFee = useSelector(totalSpinFeePRVSelector);
  const spin = useSelector(spinSelector);
  const times = spin?.times || 1;
  const errorSpinTimes = spin?.errorSpinTimes;
  const { reward, rewardName } = useSelector(spinDataSelector);
  const handleChange = async (e) => {
    let value = times;
    let err = '';
    try {
      value = toNumber(e.target.value);
      if (isNaN(value) || !isInteger(value)) {
        throw new Error('Invalid number');
      }
      if (value > MAX_SPIN_TIMES) {
        throw new Error(`Max: ${MAX_SPIN_TIMES} spins at once.`);
      }
      if (value < 1) {
        throw new Error('Min: 1 spin at once');
      }
    } catch (error) {
      err = error?.message || JSON.stringify(error);
    } finally {
      await dispatch(actionChangeTimesSpin(String(value)));
      if (err) {
        await dispatch(actionSetErrorSpinTimes(err));
      }
    }
  };
  const renderContent = () => {
    if (reward !== -1) {
      if ([1, 10, 14].includes(reward)) {
        return <Reward1 reward={reward} />;
      }
      if ([3, 7, 11, 15].includes(reward)) {
        return <Reward2 reward={rewardName} />;
      }
      if ([4, 8, 12, 16].includes(reward)) {
        return <Reward3 reward={reward} />;
      }
      if ([2, 6, 13].includes(reward)) {
        return <Reward6 reward={reward} />;
      }
      if (reward === 9) {
        //node
        return <Reward4 reward={reward} />;
      }
      if (reward === 5) {
        //vpn
        return <Reward5 reward={reward} />;
      }
      return (
        <div className='reward'>
          <p>{REWARD_NAME[reward]}</p>
        </div>
      );
    }
    return (
      <div className='intro'>
        <p className='text bold-text'>
          Spin
          <div className='spin-times'>
            <input
              type='number'
              value={times}
              min={1}
              max={10}
              onChange={handleChange}
              className='text bold-text'
            />
          </div>
          {`time${times > 1 ? 's' : ''}`}
        </p>
        <p className={`text medium-text ${errorSpinTimes ? 'error-text' : ''}`}>
          {!!errorSpinTimes ? errorSpinTimes : `with ${times} QUEST`}
        </p>
        <p className='text medium-text'>
          Spin fee: {spinPRVFee} PRV.{' '}
          <a
            href='https://we.incognito.org/t/how-to-buy-prv-in-3-steps/793?utm_source=prvholders'
            className='medium-text get-prv'
          >
            Get PRV
            <img
              src={srcArrowRight}
              alt=''
              style={{
                width: '8px',
                height: '13px',
                marginLeft: '5px',
                marginBottom: '4.5px',
              }}
            />
          </a>
        </p>
      </div>
    );
  };

  return renderContent();
};

const Board = React.memo((props) => {
  const spin = useSelector(spinSelector);
  const board = spin?.board;
  if (!board) {
    return null;
  }
  const boardFactories = [
    {
      title: board?.BtcLottery,
      desc: 'Needed to start the lottery',
      img: srcBitcoin,
    },
    {
      title: board?.SpinTaked,
      desc: 'Spins taken on the wheel',
      img: srcBox,
    },
  ];
  const renderItem = (item) => {
    const { title, desc, img } = item;
    return (
      <div className='board-item'>
        <div className='left'>
          <img src={img} alt='board-icon' className='board-icon' />
        </div>
        <div className='right'>
          <p>{title}</p>
          <p>{desc}</p>
        </div>
      </div>
    );
  };
  return (
    <div className='board'>
      {boardFactories.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
      ))}
    </div>
  );
});

const Spin = (props) => {
  const { startSpin } = props;
  const spin = useSelector(spinSelector);
  const { spinData } = spin;
  const { finish } = spinData;
  return (
    <Styled>
      <Intro />
      <SpinWheel startSpin={startSpin} rotate={!finish} />
      <Board />
      <LeaderBoard />
    </Styled>
  );
};

Spin.propTypes = {
  startSpin: PropTypes.func.isRequired,
};

export default withSpin(Spin);
