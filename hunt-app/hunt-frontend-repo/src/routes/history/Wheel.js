import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getHistory } from '@services/spinServices';
import { tokenSelector } from '@selector/login';
import {
  formatDateTime,
  REWARD_NAME,
  STATUS,
  STATUS_COLOR,
} from '@routes/spin/Spin.utils';
import SpinContainer from '@components/SpinContainer';
import { txsSpinSelector } from '@routes/spin/Spin.reducer';
import { STATUS_SPIN_AGAIN } from '@routes/spin/Spin.utils';
import srcSpinAgain from '@assets/icons/icon_spin_again.png';
import {
  actionRemoveTxFromToLocal,
  actionSpinSwheel,
} from '../spin/Spin.reducer';
import { ellipsisCenter } from '../spin/Spin.utils';
import moment from 'moment';

const Styled = styled.div`
  padding-bottom: 50px;
  .history-item {
    margin-top: 30px;
  }
  .history-item .hook {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    .spin-again {
      display: flex;
      flex-direction: row;
      align-items: center;
      > img {
        width: 17px;
        height: 19px;
        margin-right: 5px;
      }
    }
    > p {
      font-size: 16px;
      line-height: 19px;
      font-weight: 200;
    }
    :first-child {
      margin-bottom: 10px;
      > p {
        :first-child {
          color: #8a8a8e;
          font-size: 18px;
          line-height: 21px;
          b {
            font-weight: 300;
            color: #000000;
          }
        }
        :last-child {
          color: #000000;
        }
      }
    }
    :last-child {
      > p {
        :first-child {
          color: #8a8a8e;
        }
        :last-child {
          color: #000000;
        }
      }
    }
  }
`;

const HistoryItem = (props) => {
  const { item } = props;
  const { id = 0, reward = 0, status = 0, createdAt = '' } = item;
  const dispatch = useDispatch();
  const spinAgain = STATUS[status] === STATUS_SPIN_AGAIN;
  const handleSpinAgain = async () => {
    if (!spinAgain) {
      return;
    }
    try {
      const tx = { txId: id };
      await Promise.all([
        dispatch(actionRemoveTxFromToLocal(item)),
        dispatch(actionSpinSwheel(tx)),
      ]);
    } catch (error) {
      alert(error?.message || JSON.stringify(error));
    }
  };
  return (
    <div className='history-item'>
      <div className='hook'>
        <p>
          <b>Spin</b> #{spinAgain ? ellipsisCenter({ str: id, limit: 3 }) : id}
        </p>
        <p
          onClick={handleSpinAgain}
          className={spinAgain ? 'spin-again' : ''}
          style={{ color: STATUS_COLOR[status] }}
        >
          {spinAgain && <img src={srcSpinAgain} alt='' />}
          {STATUS[status]}
        </p>
      </div>
      <div className='hook'>
        <p>{formatDateTime(createdAt, 'DD MMM YYYY hh:mm A')}</p>
        <p>
          {moment(createdAt).isBefore('2020-12-03T01:00:00Z') &&
          [3, 7, 11, 15].includes(reward)
            ? '0.01PRV'
            : REWARD_NAME[reward]}
        </p>
      </div>
    </div>
  );
};

const Wheel = () => {
  const [state, setState] = React.useState({
    fetching: true,
    history: [],
  });
  const token = useSelector(tokenSelector);
  const txs = useSelector(txsSpinSelector);
  const handleFetchHistory = async () => {
    let history = [];
    try {
      history = await getHistory(token);
    } catch (error) {
      history = [];
      throw error;
    } finally {
      setState({ ...state, history: [...txs, ...history], fetching: false });
    }
  };
  React.useEffect(() => {
    handleFetchHistory();
  }, [txs]);
  return (
    <Styled>
      {txs.map((tx) => tx?.txId)}
      {state.fetching && <SpinContainer />}
      {state.history.map((item) => (
        <HistoryItem
          handleFetchHistory={handleFetchHistory}
          key={item?.id}
          item={item}
        />
      ))}
    </Styled>
  );
};

Wheel.propTypes = {};

export default Wheel;
