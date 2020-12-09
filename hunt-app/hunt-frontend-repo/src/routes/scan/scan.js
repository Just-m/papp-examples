import React from 'react';
import { Flex } from 'antd-mobile';
import { Spin } from 'antd';
import chestClose from '@assets/scan/img_closed.png';
import chestOpen from '@assets/scan/img_empty.png';
import chestWin from '@assets/scan/img_win.png';
import { LoadingOutlined } from '@ant-design/icons';
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
import { useDispatch, useSelector } from 'react-redux';
import { actionCreateTreasureScan } from '@reducers/huntReducer';
import { huntDataSelector, qrcodeSelector, huntSelector } from '@selector/hunt';
import { tokenSelector } from '@selector/login';
import ReCAPTCHA from 'react-google-recaptcha';
import { ENVS } from '@configs/env';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const treastures = [chestClose, chestOpen, chestWin];

const ScanQR = (props) => {
  const dispatch = useDispatch();
  const qrcode = useSelector(qrcodeSelector);
  const token = useSelector(tokenSelector);
  const { isFetching } = useSelector(huntSelector);
  const { data, winstatus } = useSelector(huntDataSelector);
  const recaptchaRef = React.useRef();
  const [checkingRecaptcha, setCheckingRecaptcha] = React.useState(false);
  const handleRecaptcha = async () => {
    try {
      setCheckingRecaptcha(true);
      const recaptchaToken = await recaptchaRef.current.executeAsync();
      if (recaptchaToken) {
        await dispatch(actionCreateTreasureScan(recaptchaToken));
      }
    } catch (error) {
      console.debug(error);
    } finally {
      recaptchaRef.current.reset();
      setCheckingRecaptcha(false);
    }
  };
  const render_empty = () => {
    return (
      <div>
        <Flex
          align='center'
          className='bodywrap'
          style={{ margin: '0 auto', marginTop: '30px' }}
        >
          <img
            className=''
            src={treastures[0]}
            style={{ width: '279px', margin: '0 auto' }}
            alt=''
          />
        </Flex>
        <div align='center' className='bodywrap' style={{ marginTop: '20px' }}>
          <h2 style={{ textAlign: 'left', fontWeight: 'bold' }}>
            {data?.Message}
          </h2>
          {data?.WhatNext.id !== 0 ? (
            <p
              style={{
                textAlign: 'left',
                fontSize: '16px',
                color: '#000',
                marginTop: '20px',
              }}
            >
              Try again, or try the next clue.
            </p>
          ) : (
            ''
          )}
          <h2 style={{ textAlign: 'left', fontWeight: 'bold' }}>
            {data?.WhatNext.hint}
          </h2>
        </div>
      </div>
    );
  };

  const render_valid = () => {
    const shareUrl = qrcode;
    const title =
      'Turns out, I’m amazing at privacy puzzles. Let’s see how good you are – can you win more crypto than me?';
    const slot = data?.Data
      ? data?.TotalHunted >= data?.Slot
        ? 0
        : data?.Slot - data?.TotalHunted
      : 0;

    return (
      <div>
        <h2
          style={{
            textAlign: 'right',
            fontSize: '16px',
            color: '#000',
            fontWeight: 'bold',
            paddingRight: '30px',
          }}
        >
          {data?.TotalHunted > data?.Slot ? data?.Slot : data?.TotalHunted}/
          {data?.Slot}
        </h2>
        <Flex
          align='center'
          className='bodywrap'
          style={{ margin: '0 auto', marginTop: '0px' }}
        >
          <div className='bgcoin'>
            <p className='cointxt'>{data?.Reward / data?.Slot}</p>
          </div>
        </Flex>
        <Flex
          align='center'
          className='bodywrap'
          style={{ margin: '0 auto', marginTop: '30px' }}
        >
          <img
            className=''
            src={slot > 0 ? chestClose : chestWin}
            style={{ width: '279px', margin: '0 auto' }}
            alt=''
          />
        </Flex>
        <div align='center' className='bodywrap' style={{ marginTop: '20px' }}>
          <h2 style={{ textAlign: 'left' }}>{data?.Message}</h2>

          {slot > 0 ? (
            <h2 style={{ textAlign: 'left', fontWeight: 'bold' }}>
              {slot} more people needed to unlock your{' '}
              {data?.Reward / data?.Slot} QUEST.
            </h2>
          ) : (
            ''
          )}

          <h2 style={{ textAlign: 'left' }}>
            Now, you’ll need to find enough people to help you open it. Get your
            friends involved!
          </h2>

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
          {data?.WhatNext.id !== 0 ? (
            <p
              style={{
                textAlign: 'left',
                fontSize: '16px',
                color: '#000',
                marginTop: '20px',
              }}
            >
              Here's your next clue.
            </p>
          ) : (
            ''
          )}
          <h2
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              wordBreak: 'break-word',
              paddingBottom: '40px',
            }}
          >
            {data?.WhatNext.hint}
          </h2>
        </div>
      </div>
    );
  };

  const render_latest = () => {
    return (
      <div>
        <h2
          style={{
            textAlign: 'right',
            fontSize: '16px',
            color: '#000',
            paddingRight: '30px',
          }}
        >
          {data?.Slot}/{data?.Slot}
        </h2>
        <Flex
          align='center'
          className='bodywrap'
          style={{ margin: '0 auto', marginTop: '0px' }}
        >
          <div className='bgcoin'>
            <p className='cointxt'>{data?.Slot / data?.Slot}</p>
          </div>
        </Flex>
        <Flex
          align='center'
          className='bodywrap'
          style={{ margin: '0 auto', marginTop: '-30px' }}
        >
          <img
            className=''
            src={chestWin}
            style={{ width: '279px', margin: '0 auto' }}
            alt=''
          />
        </Flex>
        <div align='center' className='bodywrap' style={{ marginTop: '20px' }}>
          <p style={{ textAlign: 'left', fontSize: '16px', color: '#000' }}>
            You just made {data?.Slot - 1} other people very happy. Don't stop
            now. Here's your next clue.
          </p>
          <h2
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              wordBreak: 'break-word',
            }}
          >
            {data?.WhatNext.hint ? data?.WhatNext.hint : ''}
          </h2>
        </div>
      </div>
    );
  };

  const render_index = (index) => {
    try {
      if (index === 4 || index === 0) {
        return render_empty();
      }
      if (index === 1) {
        return render_valid();
      }
      return render_latest();
    } catch (error) {
      console.debug(error);
    }
  };

  React.useEffect(() => {
    document.title = 'ScanQR';
    handleRecaptcha();
  }, [qrcode, token]);
  return (
    <div className='flex-container'>
      {(isFetching || checkingRecaptcha) && (
        <Spin
          style={{
            margin: '0 auto',
            marginTop: '0px',
            justifyContent: 'center',
            display: 'flex',
          }}
          indicator={antIcon}
        />
      )}
      {!data ? (
        <Flex
          align='center'
          className='bodywrap'
          style={{ margin: '0 auto', marginTop: '0px' }}
        >
          <Spin
            style={{ margin: '0 auto', marginTop: '0px' }}
            indicator={antIcon}
          />
        </Flex>
      ) : (
        render_index(winstatus)
      )}
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={ENVS.REACT_APP_RECAPCHA}
        size='invisible'
      />
    </div>
  );
};

export default React.memo(ScanQR);
