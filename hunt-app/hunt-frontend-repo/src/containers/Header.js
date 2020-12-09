import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { requestOpenCameraQRCode } from 'papp-sdk/src/sdk';
import { isAndroid } from 'react-device-detect';
import { ScanOutlined } from '@ant-design/icons';
import ReactGA from 'react-ga';
import { useDispatch } from 'react-redux';
import { actionSetQrCode } from '@reducers/huntReducer';
import styled from 'styled-components';
import { FONT_SIZES } from '../utils/styles';

const Styled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 50px;
  margin-top: 42px;
  .btn-menu {
    background-color: #f4f4f4;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    flex: 1 0 auto;
    text-align: center;
    max-width: 22%;
    font-size: ${FONT_SIZES.regular}px;
    font-weight: 200;
    &.active {
      background: #333335;
      color: white;
    }
  }
`;

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname.slice(1);
  const dispatch = useDispatch();
  const onReceiveQrCode = (qrcode) => {
    dispatch(actionSetQrCode(qrcode));
    history.push('/scan');
  };
  const onMessage = (e) => {
    try {
      const payload = e.data;
      if (payload) {
        const [command, data] = payload?.split('|');
        if (!data) return;
        const parseData = JSON.parse(data);
        if (command) {
          switch (command) {
            case 'on_receive_qr_code':
              const { qrCode } = parseData || {};
              if (qrCode) {
                onReceiveQrCode(qrCode);
              }
              break;
            default:
              break;
          }
        }
      }
    } catch (error) {
      console.log('OnMessage with Error: ', error);
    }
  };

  const openCam = () => {
    ReactGA.event({
      category: 'QUEST',
      action: 'scan_code', //// open_question scan_code // spin_wheel
    });
    requestOpenCameraQRCode && requestOpenCameraQRCode();
  };

  React.useEffect(() => {
    document.title = 'My List treasures box';
    if (isAndroid) {
      document.addEventListener('message', onMessage);
    } else {
      window.addEventListener('message', onMessage);
    }
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <Styled>
      <Link
        to='#'
        onClick={(e) => {
          e.preventDefault();
          openCam();
        }}
        className={`camera-menu btn-menu ${
          path === 'scan' || path === 'cam' ? 'active' : ''
        }`}
      >
        <ScanOutlined />
      </Link>
      <Link to='/' className={`btn-menu ${path === '' ? 'active' : ''}`}>
        Map
      </Link>
      <Link
        to='/spin'
        className={`btn-menu ${path === 'spin' ? 'active' : ''}`}
      >
        Spin
      </Link>
      <Link
        to='/history'
        className={`btn-menu ${path === 'history' ? 'active' : ''}`}
      >
        History
      </Link>
    </Styled>
  );
};

export default Header;
