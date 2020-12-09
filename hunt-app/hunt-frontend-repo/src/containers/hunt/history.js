import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';
import chest_found_not_yet_open from '@assets/maps/chest_found_not_yet_open.png';
import chest_open_miss from '@assets/maps/chest_open_miss.png';
import chest_open_win from '@assets/maps/chest_open_win.png';

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

const Item = List.Item;
const Brief = Item.Brief;

class ScanQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      myList: [],
    };
  }

  hanldeGetListTreasureItem = async () => {
    try {
      const { token } = this.props;
      if (!token) {
        return;
      }
      const result = await getListTreasureItemService(token);
      this.setState({
        data: result.Data,
      });
    } catch (error) {
      throw error;
    }
  };

  async componentDidMount() {
    document.title = 'My List treasures box';
    this.hanldeGetListTreasureItem();
  }

  async componentDidUpdate(prevProps) {
    const token = this.props.token;
    const prevToken = prevProps.token;
    if (token !== prevToken) {
      this.hanldeGetListTreasureItem();
    }
  }

  render() {
    const shareUrl = 'https://incognito.org/quest';
    const title =
      'Turns out, I’m amazing at privacy puzzles. Let’s see how good you are – can you win more crypto than me?';
    return (
      <div className='flex-container bodywrap2'>
        <div style={{ display: 'inline-flex', marginTop: '12px' }}>
          <div className='img_icon_share Demo__some-network'>
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className='img_icon_share Demo__some-network__share-button'
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
          <div className='img_icon_share Demo__some-network'>
            <TwitterShareButton
              url={shareUrl}
              title={title}
              className='img_icon_share Demo__some-network__share-button'
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>

          <div className='img_icon_share Demo__some-network'>
            <TelegramShareButton
              url={shareUrl}
              title={title}
              className='img_icon_share Demo__some-network__share-button'
            >
              <TelegramIcon size={32} round />
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
              <RedditIcon size={32} round />
            </RedditShareButton>
          </div>
          <div className='img_icon_share Demo__some-network'>
            <EmailShareButton
              url={shareUrl}
              subject={title}
              body='body'
              className='img_icon_share Demo__some-network__share-button'
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        </div>
        <List className='my-list'>
          {this.state.data.map((item, index) =>
            item.hunted > 0 ? (
              <Item
                thumb={
                  item.hunted >= item.slot
                    ? chest_open_miss
                    : item.hunters >= item.slot
                    ? chest_open_win
                    : chest_found_not_yet_open
                }
                multipleLine
                wrap
              >
                {item.hunted >= item.slot
                  ? 0
                  : item.hunters >= item.slot
                  ? item.reward / item.slot
                  : `0/${item.reward / item.slot}`}{' '}
                QUEST<Brief>{item.hint}</Brief>
              </Item>
            ) : null
          )}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: tokenSelector(state),
});

export default connect(mapStateToProps)(ScanQR);
