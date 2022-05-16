import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginAction, loginUserAction } from '../../store/login';
import styled from 'styled-components';
import ChattingDetail from '../../pages/ChattingDetail';
import io from 'socket.io-client';

let socket;

const ChatModal = ({ setChattingModal }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const loginUser = useSelector((state) => state.login.loginUser);

  const closeChattingModal = () => {
    setChattingModal(false);
  };
  const [roomList, setRoomList] = useState([]);
  const [click, setClick] = useState(false);
  const [newRoomName, setNewRoomName] = useState({
    chatId: '',
    chatName: '',
  });

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_API_URL}`, {
      transports: ['websocket', 'polling'],
    });
    // rooms 정보(roomName, roomUser) 받기
    let nickname = loginUser.nickname;
    socket.emit('joinServer', { nickname });
    socket.on('myRoomList', ({ userRoom, userNickName }) => {
      if (userNickName === nickname) {
        setRoomList(userRoom);
      }
    });
    return () => {
      socket.off();
    };
  }, [setChattingModal]);

  const handleChatList = (e, el) => {
    setNewRoomName({
      chatId: el.id,
      chatName: el.roomName,
    });
    setClick(true);
  };

  return (
    <>
      <ModalBackdrop onClick={closeChattingModal}>
        <Wrapper onClick={(e) => e.stopPropagation()}>
          <LoginForm onSubmit={(e) => e.preventDefault()}>
            <PostingWriteTitle>
              채팅
              <PostSpan onClick={closeChattingModal}>&times;</PostSpan>
            </PostingWriteTitle>
            {(function () {
              if (roomList.length === 0) {
                return (
                  <PostNoneDiv>
                    <i className="fas fa-comment-dots" />
                    <PostNone>채팅방이 없습니다</PostNone>
                  </PostNoneDiv>
                );
              } else if (!click) {
                return roomList.map((el, index) => {
                  return (
                    <ChattingWrapper key={index} onClick={(e) => handleChatList(e, el)}>
                      <ChattingListImg src={`/icon/${el.categoryFood}.png`} />
                      <ChattingListTextWrapper>
                        <ChattingListText>{el.roomName}</ChattingListText>
                      </ChattingListTextWrapper>
                    </ChattingWrapper>
                  );
                });
              } else if (click) {
                return (
                  <ChattingDetail
                    newRoomName={newRoomName}
                    click={click}
                    setClick={setClick}
                    setChattingModal={setChattingModal}
                  />
                );
              }
            })()}
          </LoginForm>
        </Wrapper>
      </ModalBackdrop>
    </>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const PostingWriteTitle = styled.div`
  font-family: var(--main-font);
  font-size: 28px;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const PostSpan = styled.span`
  position: absolute;
  right: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  text-align: center;
  overflow: auto;
  /* width: 320px;
    height: 568px; */
  width: 375px;
  height: 667px;
  display: flex;
  justify-content: center;
  background-color: #f4f4f4;
  position: fixed;
  bottom: 22px;
  left: 22px;
  z-index: 1;
  border-radius: 15px;
  @media (max-width: 576px) {
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c9c9c9;
    border: 4px solid transparent;
    border-radius: 15px;
    background-clip: padding-box;
  }
  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const LoginForm = styled.div``;

const ChattingWrapper = styled.div`
  width: 345px;
  height: 98px;
  background-color: #ffffff;
  border: 1px solid #cdcbc5;
  display: flex;
  border-radius: 6px;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const ChattingListImg = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 20px;
  margin-left: 20px;
`;

const ChattingListTextWrapper = styled.div`
  /* padding-left: 40px; */
  font-size: 16px;
  font-weight: 500;
  margin-top: -3px;
  :hover {
    font-size: 17px;
    font-weight: 500;
  }
`;

const ChattingListText = styled.div`
  margin-top: 35px;
  margin-left: 20px;
`;

const PostNone = styled.div`
  margin-top: 10px;
`;

const PostNoneDiv = styled.div`
  transform: translate(0, 400%);
  text-align: center;
`;

export default ChatModal;
