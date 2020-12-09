import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Flex } from 'antd-mobile';
import { Tooltip, Spin } from 'antd';
import chest_found_not_yet_open from '@assets/maps/chest_found_not_yet_open.png';
import chest_not_found_opened from '@assets/maps/chest_not_found_opened.png';
import chest_not_found from '@assets/maps/chest_not_found.png';
import chest_open_miss from '@assets/maps/chest_open_miss.png';
import chest_open_win from '@assets/maps/chest_open_win.png';
import { getListTreasureItemService } from '@services/treasureService';
import { UserOutlined } from '@ant-design/icons';
import { PropTypes } from 'prop-types';
import { tokenSelector } from '@selector';
import { preloadSelector } from '@selector/preload';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class HuntApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      token: null,
    };
  }

  handleChange = (tokenId) => {
    this.setState(({ supportedTokenIds }) => {
      return {
        supportedTokenIds: [...supportedTokenIds, tokenId],
      };
    });
  };

  handleGetListTreasure = async () => {
    const token = this.props?.token;
    if (!token) {
      return;
    }
    try {
      const result = await getListTreasureItemService(token);
      this.setState({
        data: result.Data,
      });
    } catch (error) {
      throw error;
    }
  };

  async componentDidUpdate(prevProps) {
    if (prevProps?.token !== this.props?.token) {
      this.handleGetListTreasure();
    }
  }

  async componentDidMount() {
    this.handleGetListTreasure();
  }

  render() {
    return (
      <div>
        <h2 style={{ padding: '0px 30px', fontSize: '16px', color: '#000' }}>
          Tap on the treasure chests to uncover special clues. Solve them to
          find codes hidden all over the internet.
        </h2>

        {this.state.data == null ? (
          <Flex
            align='center'
            className='bodywrap'
            style={{ margin: '0 auto', marginTop: '60px' }}
          >
            <Spin
              style={{ margin: '0 auto', marginTop: '0px' }}
              indicator={antIcon}
            />
          </Flex>
        ) : null}
        <Grid
          data={this.state.data}
          hasLine={false}
          columnNum={3}
          className='bodywrap'
          renderItem={(dataItem, index) => (
            <div>
              <Tooltip
                placement={
                  index % 3 === 0
                    ? 'bottomLeft'
                    : index % 3 === 1
                    ? 'bottom'
                    : 'bottomRight'
                }
                title={dataItem.hint}
              >
                {dataItem.hunted > 0 ? (
                  <img
                    src={
                      dataItem.hunted >= dataItem.slot
                        ? chest_open_miss
                        : dataItem.hunters >= dataItem.slot
                        ? chest_open_win
                        : chest_found_not_yet_open
                    }
                    style={{ width: '40px' }}
                    alt=''
                  />
                ) : (
                  <img
                    src={
                      dataItem.hunters >= dataItem.slot
                        ? chest_not_found_opened
                        : chest_not_found
                    }
                    style={{ width: '40px' }}
                    alt=''
                  />
                )}
              </Tooltip>
              <div
                style={{ color: '#888', fontSize: '14px', marginTop: '6px' }}
              >
                <p className='box-hunts'>
                  {dataItem.reward / dataItem.slot} QUEST
                </p>
                <p className='box-users'>
                  <UserOutlined />{' '}
                  {(dataItem.hunters >= dataItem.slot
                    ? dataItem.slot
                    : dataItem.hunters) +
                    '/' +
                    dataItem.slot}
                </p>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

HuntApp.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = (state) => ({
  token: tokenSelector(state),
  preload: preloadSelector(state),
});

export default connect(mapStateToProps)(HuntApp);
