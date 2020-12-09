import styled from 'styled-components';
import { COLORS, FONT_SIZES } from '@utils/styles';

export const Styled = styled.div`
  .extra {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-bottom: 50px;
    margin-top: 30px;
  }
  .intro {
    font-size: ${FONT_SIZES.regular}px;
    line-height: ${FONT_SIZES.regular + 5}px;
    color: ${COLORS.black};
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  .item .box-hunts,
  .box-users {
    font-size: ${FONT_SIZES.regular}px;
    line-height: ${FONT_SIZES.regular + 3}px;
  }

  .item .box-users {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    .user-icon {
      margin-right: 5px;
    }
  }
  @media only screen and (max-width: 376px) {
    .item .box-hunts {
      font-size: 16px;
      line-height: 19px;
    }
    .item .box-users {
      font-size: 14px;
      line-height: 18px;
    }
  }

  .item .box-hunts {
    color: #000;
    margin-bottom: 5px;
  }
  .item .box-users {
    color: ${COLORS.colorGreyBold};
  }
  .item .box {
    margin-bottom: 15px;
    > img {
      width: 44px;
      height: 45px;
    }
  }
`;
