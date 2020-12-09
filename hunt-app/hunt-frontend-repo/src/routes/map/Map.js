import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import chest_found_not_yet_open from '@assets/maps/chest_found_not_yet_open.png';
import chest_not_found_opened from '@assets/maps/chest_not_found_opened.png';
import chest_not_found from '@assets/maps/chest_not_found.png';
import chest_open_miss from '@assets/maps/chest_open_miss.png';
import chest_open_win from '@assets/maps/chest_open_win.png';
import { getListTreasureItemService } from '@services/treasureService';
import { PropTypes } from 'prop-types';
import { tokenSelector } from '@selector';
import { preloadSelector } from '@selector/preload';
import { compose } from 'recompose';
import SpinContainer from '@components/SpinContainer';
import { Styled } from './Map.styled';
import UserIcon from '@components/UserIcon';

const Item = React.memo((props) => {
  const { item, index } = props;
  return (
    <div className='item'>
      <div className='box'>
        <Tooltip
          placement={
            index % 3 === 0
              ? 'bottomLeft'
              : index % 3 === 1
              ? 'bottom'
              : 'bottomRight'
          }
          title={item.hint}
        >
          {item.hunted > 0 ? (
            <img
              src={
                item.hunted >= item.slot
                  ? chest_open_miss
                  : item.hunters >= item.slot
                  ? chest_open_win
                  : chest_found_not_yet_open
              }
              alt=''
            />
          ) : (
            <img
              src={
                item.hunters >= item.slot
                  ? chest_not_found_opened
                  : chest_not_found
              }
              alt=''
            />
          )}
        </Tooltip>
      </div>
      <p className='box-hunts text bold-text'>
        {item.reward / item.slot} QUEST
      </p>
      <p className='box-users text medium-text'>
        <UserIcon />{' '}
        {(item.hunters >= item.slot ? item.slot : item.hunters) +
          '/' +
          item.slot}
      </p>
    </div>
  );
});

const Extra = (props) => {
  const { data } = props;
  return (
    <div className='extra'>
      {data.map((item, index) => (
        <Item item={item} index={index} key={item?.id} />
      ))}
    </div>
  );
};

const HuntApp = (props) => {
  const token = useSelector(tokenSelector);
  const [state, setState] = React.useState({
    data: [],
    fetching: false,
  });
  const { data, fetching } = state;
  const handleGetListTreasure = async () => {
    if (!token) {
      return;
    }
    let data = [];
    try {
      await setState({ ...state, fetching: true });
      const result = await getListTreasureItemService(token);
      data = result?.Data || [];
    } catch (error) {
      throw error;
    } finally {
      setState({
        fetching: false,
        data,
      });
    }
  };
  React.useEffect(() => {
    handleGetListTreasure();
  }, [token]);
  return (
    <Styled>
      <p className='text medium-text intro'>
        Tap on the treasure chests to uncover special clues. Solve them to find
        codes hidden all over the internet.
      </p>
      {fetching ? <SpinContainer /> : <Extra data={data} />}
    </Styled>
  );
};

HuntApp.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: tokenSelector(state),
  preload: preloadSelector(state),
});

export default compose(connect(mapStateToProps))(HuntApp);
