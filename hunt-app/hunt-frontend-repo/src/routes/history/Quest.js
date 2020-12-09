import React from 'react';
import { connect } from 'react-redux';
import chest_found_not_yet_open from '@assets/maps/chest_found_not_yet_open.png';
import chest_open_miss from '@assets/maps/chest_open_miss.png';
import chest_open_win from '@assets/maps/chest_open_win.png';
import styled from 'styled-components';
import SpinContainer from '@components/SpinContainer';
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  RedditIcon,
} from 'react-share';
import { getListTreasureItemService } from '@services/treasureService';
import { tokenSelector } from '@selector';
import { FONT_SIZES } from '@utils/styles';
import UserIcon from '@components/UserIcon';

const Styled = styled.div`
  .social-icons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 30px 0;
    .img_icon_share {
      margin-right: 0;
      display: flex;
    }
  }
  .list {
    padding-bottom: 50px;
  }
  .list .item {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    padding: 15px 0;
  }
  .list .item .box {
    margin-right: 20px;
    > img {
      width: 35px;
      height: 36px;
    }
  }
  .list .item .quest {
    flex: 1 0 auto;
    width: calc(100% - 60px);
    > p {
      :last-child {
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 5}px;
        text-align: left;
      }
    }
  }
  .list .item .quest .quest-hook {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    > p {
      :last-child {
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 5}px;
      }
    }
  }

  .list .item .quest .quest-hook .box-users {
    display: flex;
    flex-direction: row;
    align-items: center;
    .user-icon {
      margin-right: 5px;
    }
  }
`;

const Item = React.memo((props) => {
  const { item } = props;
  return (
    <div className='item'>
      <div className='box'>
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
      </div>
      <div className='quest'>
        <div className='quest-hook'>
          <p className='text bold-text'>
            {item.hunted >= item.slot
              ? 0
              : item.hunters >= item.slot
              ? item.reward / item.slot
              : `0/${item.reward / item.slot}`}{' '}
            QUEST
          </p>
          <p className='box-users text medium-text'>
            <UserIcon />
            {(item.hunters >= item.slot ? item.slot : item.hunters) +
              '/' +
              item.slot}
          </p>
        </div>
        <p className='text medium-text'>{item.hint}</p>
      </div>
    </div>
  );
});

const List = React.memo((props) => {
  const { data } = props;
  return (
    <div className='list'>
      {data.map((item) => (
        <Item item={item} key={item?.id} />
      ))}
    </div>
  );
});

const ScanQR = (props) => {
  const { token } = props;
  const shareUrl = 'https://incognito.org/quest';
  const title =
    'Turns out, I’m amazing at privacy puzzles. Let’s see how good you are – can you win more crypto than me?';
  const [state, setState] = React.useState({
    fetching: false,
    data: [],
  });
  const hanldeGetListTreasureItem = async () => {
    if (!token) {
      return;
    }
    let data = [];
    try {
      setState({ ...state, fetching: true });
      const result = await getListTreasureItemService(token);
      data = result?.Data || [];
    } catch (error) {
      throw error;
    } finally {
      setState({ ...state, fetching: false, data });
    }
  };

  React.useEffect(() => {
    hanldeGetListTreasureItem();
  }, [token]);

  return (
    <Styled>
      <div className='flex-container bodywrap2'>
        <div className='social-icons'>
          <div className='img_icon_share Demo__some-network'>
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className='img_icon_share Demo__some-network__share-button'
            >
              <FacebookIcon size={30} round />
            </FacebookShareButton>
          </div>
          <div className='img_icon_share Demo__some-network'>
            <TwitterShareButton
              url={shareUrl}
              title={title}
              className='img_icon_share Demo__some-network__share-button'
            >
              <TwitterIcon size={30} round />
            </TwitterShareButton>
          </div>

          <div className='img_icon_share Demo__some-network'>
            <TelegramShareButton
              url={shareUrl}
              title={title}
              className='img_icon_share Demo__some-network__share-button'
            >
              <TelegramIcon size={30} round />
            </TelegramShareButton>
          </div>

          <div className='img_icon_share Demo__some-network'>
            <RedditShareButton
              url={shareUrl}
              title={title}
              windowWidth={660}
              windowHeight={460}
              className='img_icon_share Demo__some-network__share-button'
            >
              <RedditIcon size={30} round />
            </RedditShareButton>
          </div>
          <div className='img_icon_share Demo__some-network'>
            <EmailShareButton
              url={shareUrl}
              subject={title}
              body='body'
              className='img_icon_share Demo__some-network__share-button'
            >
              <EmailIcon size={30} round />
            </EmailShareButton>
          </div>
        </div>
        {state.fetching && <SpinContainer />}
        {state.data && <List data={state.data} />}
      </div>
    </Styled>
  );
};

const mapStateToProps = (state) => ({
  token: tokenSelector(state),
});

export default connect(mapStateToProps)(ScanQR);
