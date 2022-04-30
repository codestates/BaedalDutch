import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { showWriteAction } from '../store/modal';

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
`;

const WriteButton = styled(Button)`
  background-color: #fff;
`;

const ChattingButton = styled(Button)`
  background-color: white;
`;

const ButtonMenu = () => {
  console.log('버튼메뉴');
  console.log('버튼');
  const dispatch = useDispatch();
  const showWriteModal = useSelector((state) => state.modal.showWriteModal);
  console.log('글쓰기모달', showWriteModal);

  return (
    <ButtonWrap>
      <WriteButton onClick={() => dispatch(showWriteAction(true))}>
        <i className="fa-solid fa-pen-to-square" />
      </WriteButton>
      <ChattingButton>
        <i className="fas fa-comment-dots" />
      </ChattingButton>
    </ButtonWrap>
  );
};

export default ButtonMenu;
