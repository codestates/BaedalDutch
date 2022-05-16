import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { showWriteAction } from '../../store/modal';
import ChatModal from '../Modal/ChatModal';
import { useState } from 'react';
import { ShowSideBarAction } from '../../store/side';
import { useMediaQuery } from 'react-responsive';
import { ShowListButtonAction } from '../../store/list';

const ButtonWrap = styled.div`
  display: flex;
  position: absolute;
  z-index: 999;
  bottom: 0;
  left: 50px;
`;

const Button = styled.button`
  border-radius: 50px;
  font-size: 30px;
  padding: 20px;
  border: none;
  cursor: pointer;
  margin: 10px;
  background-color: rgba(242, 198, 112);
  color: white;
  @media screen and (max-width: 800px) {
    font-size: 20px;
  }
`;

const Listbutton = styled(Button)``;

const WriteButton = styled(Button)``;

const ChattingButton = styled(Button)``;

const ButtonMenu = () => {
  const dispatch = useDispatch();
  const showWriteModal = useSelector((state) => state.modal.showWriteModal);
  const showSideBar = useSelector((state) => state.side.showSideBar);
  const showListButton = useSelector((state) => state.list.showListButton);
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' }, undefined);
  // if (isMobile) {
  //   dispatch(ShowListButtonAction(true));
  // } else {
  //   dispatch(ShowListButtonAction(false));
  // }
  const test = () => {
    dispatch(ShowSideBarAction(!showSideBar));
    dispatch(ShowListButtonAction(!showListButton));
  };

  const [ChattingModal, setChattingModal] = useState(false);

  const openModalChatting = () => {
    setChattingModal(!ChattingModal);
  };

  return (
    <div>
      {showWriteModal ? null : (
        <ButtonWrap>
          {isMobile ? (
            <Listbutton onClick={test}>
              <i className="fa-solid fa-list"></i>
            </Listbutton>
          ) : null}

          <WriteButton onClick={() => dispatch(showWriteAction(true))}>
            <i className="fa-solid fa-pen-to-square" />
          </WriteButton>
          <ChattingButton onClick={openModalChatting}>
            <i className="fas fa-comment-dots" />
          </ChattingButton>
          {ChattingModal === true ? <ChatModal setChattingModal={setChattingModal} /> : null}
        </ButtonWrap>
      )}
    </div>
  );
};

export default ButtonMenu;
