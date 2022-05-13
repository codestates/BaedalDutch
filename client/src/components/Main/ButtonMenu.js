import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { showWriteAction } from '../../store/modal';
import ChatModal from '../Modal/ChatModal';
import { useState } from 'react';
import { ShowSideBarAction } from '../../store/side';

const ButtonWrap = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
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
`;

const ShowListButton = styled(Button)`
  background-color: white;
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const WriteButton = styled(Button)`
  background-color: white;
`;

const ChattingButton = styled(Button)`
  background-color: white;
`;

const ButtonMenu = () => {
  const dispatch = useDispatch();
  const showWriteModal = useSelector((state) => state.modal.showWriteModal);
  const showSideBar = useSelector((state) => state.side.showSideBar);

  const [ChattingModal, setChattingModal] = useState(false);

  const openModalChatting = () => {
    setChattingModal(!ChattingModal);
  };

  return (
    <ButtonWrap>
      <ShowListButton onClick={() => dispatch(ShowSideBarAction(!showSideBar))}>
        <i class="fa-solid fa-list"></i>
      </ShowListButton>

      <WriteButton onClick={() => dispatch(showWriteAction(true))}>
        <i className="fa-solid fa-pen-to-square" />
      </WriteButton>
      <ChattingButton onClick={openModalChatting}>
        <i className="fas fa-comment-dots" />
      </ChattingButton>
      {ChattingModal === true ? <ChatModal setChattingModal={setChattingModal} /> : null}
    </ButtonWrap>
  );
};

export default ButtonMenu;
