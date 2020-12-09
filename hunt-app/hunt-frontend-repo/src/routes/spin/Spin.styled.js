import styled from 'styled-components';
import { COLORS, FONT_SIZES } from '../../utils/styles';

export const Styled = styled.div`
  @keyframes rotating {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  p.error-text {
    color: #f40000 !important;
    text-align: center;
    margin-top: 15px;
  }
  .spin-container {
    position: relative;
    margin-top: 50px;
    .spin-point {
      position: absolute;
      width: 40px;
      top: 0;
      z-index: 1;
      left: 50%;
      transform: translateX(-50%);
      top: -40px;
    }
    .spin-btn {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      cursor: pointer;
    }
    .spin-coin {
      max-width: 100%;
    }
    .spin-rotate {
      /* animation: rotating 0.25s linear infinite; */
    }
  }

  .leaderboard {
    padding-bottom: 50px;
    margin-top: 30px;
    margin-left: -30px;
    margin-right: -30px;
    .prize {
      display: flex;
      align-items: center;
    }
    .prize .info-icon {
      width: 15px;
      height: 15px;
      margin-left: 5px;
      cursor: pointer;
    }
  }

  .leaderboard .leaderboard-item {
    height: 50px;
    padding-right: 30px;
    padding-left: 30px;
    :nth-child(2n) {
      background-color: #f4f4f4;
    }
    display: flex;
    align-items: center;
    > p {
      text-align: center;
      font-size: 15px;
      line-height: 20px;
      :first-child {
        flex-basis: 40%;
        text-align: left;
      }
      :nth-child(2) {
        flex-basis: 30%;
      }
      :last-child {
        flex-basis: 30%;
      }
    }
  }

  .intro {
    .get-prv {
      color: #000;
    }
    > p {
      text-align: center;
      font-size: 18px;
      line-height: 21px;
      color: #8a8a8e;
      :first-child {
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 10px;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      :nth-child(2) {
        font-size: 15px;
        line-height: 18px;
      }
      :last-child {
        margin-top: 15px;
      }
    }
  }
  .intro .spin-times {
    margin: 0 10px;
    position: relative;
    ::before {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 2px;
      background-color: ${COLORS.colorGreyMedium};
      content: '';
    }
    > input {
      width: 50px;
      text-align: center;
      border: none;
      padding: 0;
      padding-bottom: 5px;
      color: ${COLORS.black};
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
  .reward-2 {
    > p {
      text-align: center;
      &.bold-text {
        font-size: ${FONT_SIZES.superMedium}px;
        line-height: 24px;
        color: #000 !important;
        font-weight: 500;
      }
    }

    .medium-text {
      margin-top: 10px;
    }
  }
  .board {
  }
  .board .board-item {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .left {
      margin-right: 10px;
    }
    .right {
      > p {
        :first-child {
          font-size: 18px;
          line-height: 21px;
          font-weight: 300;
          color: #000;
        }
        :last-child {
          color: #8a8a8e;
          font-weight: 200;
        }
      }
    }
    .board-icon {
      width: 35px;
      height: 35px;
    }
  }

  .reward {
    > p {
      text-align: center;
      :first-child {
        font-size: 20px;
        line-height: 24px;
        color: #000;
        font-weight: 300;
        margin-bottom: 10px;
      }
      :last-child {
        font-size: 18px;
        line-height: 21px;
        color: #8a8a8e;
        font-weight: 200;
      }
    }
  }
`;

export const InfoStyled = styled.div`
  padding-bottom: 50px;
  .prize {
    font-size: 20px;
    line-height: 24px;
    font-weight: 300;
  }
  .info-item {
    margin-top: 30px;
    .medium-text {
      font-size: 16px;
      line-height: 24px;
      color: #8a8a8e;
      b {
        font-weight: 300;
        color: #000000;
      }
    }
    a.medium-text {
      color: #000;
    }
  }
`;

export const ClaimStyled = styled.div`
  p {
    :first-child {
      margin-bottom: 30px;
    }
  }
  .medium-text {
    font-size: ${FONT_SIZES.regular}px;
    line-height: ${FONT_SIZES.regular + 5}px;
    color: #8a8a8e;
    margin-bottom: 30px;
    > b {
      text-decoration: underline;
    }
  }
`;
