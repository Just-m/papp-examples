import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { modalReducer } from '.';
import { actionToggleModal, modalSelector } from './Modal.reducer';

const Styled = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  top: 0;
  width: 100%; /* Full width */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  height: 100%;
  max-width: 375px;
  min-width: 320px;
  left: 50%;
  transform: translateX(-50%);
  /* Modal Content */
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    width: 100%;
    height: 100%;
  }
  /* The Close Button */
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Modal = (props) => {
  const dispatch = useDispatch();
  const modal = useSelector(modalSelector);
  const { toggle, data } = modal;
  const handleCloseModal = () => {
    dispatch(actionToggleModal());
  };
  if (!toggle) {
    return null;
  }
  return (
    <Styled>
      <div class='modal-content'>
        <span class='close' onClick={handleCloseModal}>
          &times;
        </span>
        {data}
      </div>
    </Styled>
  );
};

Modal.propTypes = {};

export default React.memo(Modal);
