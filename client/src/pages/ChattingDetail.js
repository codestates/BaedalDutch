import styled from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
// import './chatting.css';

const socket = io(`${process.env.REACT_APP_API_URL}`);

function ChattingDetail({ newRoomName, click, setClick, setChattingModal }) {
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state.loginReducer.loginUser);

  const closeChattingModal = () => {
    setChattingModal(false);
  };

  const handleBack = () => {
    setClick(!click);
  };

  const [roomMessageInfo, setRoomMessageInfo] = useState({
    nickname: loginUser.nickname,
    message: '',
    roomId: newRoomName.chatId,
  });
  const [roomChatLog, setRoomChatLog] = useState([]);

  useEffect(() => {
    // room 채팅 기록 받기
    let nickname = loginUser.nickname;
    let roomId = newRoomName.chatId;

    socket.emit('joinServer', { nickname, roomId });
    socket.on('roomChatLog', ({ slice, roomId }) => {
      if (newRoomName.chatId === roomId) {
        setRoomChatLog(slice);
      }
    });
    socket.on('roomChatLog2', ({ slice, roomId }) => {
      if (newRoomName.chatId === roomId) {
        setRoomChatLog(slice);
      }
    });

    return () => {
      socket.off();
    };
  }, []);

  const sendRoomMessage = () => {
    socket.emit('sendRoomMessage', roomMessageInfo);
    setRoomMessageInfo({ ...roomMessageInfo, message: '' });
  };

  const handleInputValue = (value) => (e) => {
    if (value === 'roomMessage') {
      setRoomMessageInfo({ ...roomMessageInfo, message: e.target.value });
    }
  };

  const enterKey = (value) => (e) => {
    if (e.key === 'Enter') {
      if (value === 'roomMessage') {
        if (roomMessageInfo.message.length !== 0) {
          sendRoomMessage();
        }
      }
    }
  };

  const leaveRoom = () => {
    let nickname = loginUser.nickname;
    let roomId = newRoomName.chatId;

    socket.emit('leaveRoom', { roomId, nickname });

    closeChattingModal();
  };

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  return (
    <>
      <ModalBackdrop onClick={closeChattingModal}>
        <Wrapper onClick={(e) => e.stopPropagation()}>
          <LoginForm>
            <PostingWriteTitle>
              <PostSpan>
                <svg
                  onClick={handleBack}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16.67 0l2.83 2.829-9.339
            9.175 9.339 9.167-2.83
            2.829-12.17-11.996z"
                  />
                </svg>
              </PostSpan>
              <PostNameDiv>{newRoomName.chatName}</PostNameDiv>
              <div className="menuContainer">
                <button onClick={onClick} className="menuTrigger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="userSvg"
                    width="24"
                    height="24"
                    stroke="#ffffff"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3
                  1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343
                  3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9
                  0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                    />
                  </svg>
                </button>
                <nav ref={dropdownRef} className={`loginMenu ${isActive ? 'active' : 'inactive'}`}>
                  <ul>
                    <li onClick={leaveRoom}>
                      <a>채팅방 나가기</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </PostingWriteTitle>

            <ChattingWrapper>
              {roomChatLog.map((el, index) => {
                return el.nickname !== loginUser.nickname ? (
                  <ChattingListDiv key={index}>
                    <ChattingListText>{el.nickname}</ChattingListText>
                    <ChattingContents>{el.message}</ChattingContents>
                  </ChattingListDiv>
                ) : (
                  <ChattingMyListDiv key={index}>
                    <ChattingMyListText>{el.nickname}</ChattingMyListText>
                    <ChattingMyContents>{el.message}</ChattingMyContents>
                  </ChattingMyListDiv>
                );
              })}

              {/* {roomChatLog.map( ({ nickname, message }, index) => {
          return (
            <ChattingListDiv key={index}>
              <ChattingListText>{nickname}</ChattingListText>
              <ChattingContents>{message}</ChattingContents>
            </ChattingListDiv>
          )
        })}      */}
            </ChattingWrapper>
            <ChattingSendDiv>
              <InputField
                placeholder="메세지를 입력해주세요"
                onChange={handleInputValue('roomMessage')}
                value={roomMessageInfo.message}
                onKeyUp={enterKey('roomMessage')}
              />
              {/* <InputField placeholder="메세지를 입력해주세요" onChange={handleInputValue('roomMessage')} value={roomMessageInfo.message} onKeyPress={enterKey('roomMessage')} /> */}
              <Button onClick={sendRoomMessage}>전송</Button>
            </ChattingSendDiv>
          </LoginForm>
        </Wrapper>
      </ModalBackdrop>
    </>
  );
}

// const PostingWriteTitle = styled.div`
//   font-size: 20px;
//   margin-top: 25px;
//   margin-bottom: 25px;
// `;

const PostingWriteTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  height: 70px;
  /* margin-top: 25px;
  margin-bottom: 25px; */
`;

const PostSpan = styled.span`
  margin-top: 25px;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const PostNameDiv = styled.div`
  font-family: var(--main-font);
  margin-top: 22px;
  font-size: 22px;
  margin-left: 5px;
  font-weight: bold;
`;

const ChattingListDiv = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const ChattingMyListDiv = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row-reverse;
`;

const ChattingMyListText = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;

const ChattingMyContents = styled.div`
  /* display: flex; */
  width: 200px;
  padding: 15px;
  border-radius: 10px;
  background-color: #cea163;
  /* margin-left: 120px; */
  word-break: break-all;
`;

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

const Wrapper = styled.div`
  text-align: center;
  overflow: hidden;
  /* width: 320px;
    height: 568px; */
  width: 376px;
  height: 667px;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  position: fixed;
  bottom: 60px;
  right: 18px;
  z-index: 1;
  border-radius: 20px;
  border: 1px solid #737373;
  @media (max-width: 576px) {
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const LoginTitle = styled.div`
  font-size: 18px;
  margin-top: 25px;
  //em, rem 으로 변경
  margin-bottom: 20px;
`;

const LoginForm = styled.div``;

const ChattingWrapper = styled.div`
  width: 375px;
  height: 490px;
  background-color: #f4f4f4;
  overflow: auto;
  border: 1px solid #a3a3a3;
  /* flex-wrap: wrap; */
  /* display: flex; */
  /* flex-direction: column; */
`;

const ChattingListImg = styled.img`
  width: 50px;
  height: 50px;
  background-color: #d2d1d1;
  border-radius: 50%;
  margin-top: 20px;
  margin-left: 20px;
`;

const ChattingContents = styled.div`
  width: 200px;
  padding: 15px;
  border-radius: 10px;
  background-color: #d5b483;
  margin-left: 10px;
  word-break: break-all;
`;

const ChattingListText = styled.div`
  /* margin-top: 25px; */
  margin-left: 10px;
`;

const ChattingSendDiv = styled.div`
  display: flex;
  width: 375px;
  height: 111px;
  background-color: #ffffff;
  /* border-radius: 0px 0 30px 30px; */
  border: 1px solid #a3a3a3;
  margin-top: -1px;
`;

const InputField = styled.input`
  width: 300px;
  height: 56px;
  font-size: 18px;
  margin-top: 25px;
  margin-left: 10px;
  border-radius: 6px;
  border: solid 1px #c4c4c4;
  padding-left: 5px;
  &:focus {
    outline: none;
    border: 1px solid #c4c4c4;
  }
`;

const Button = styled.button`
  margin-top: 25px;
  width: 50px;
  height: 56px;
  margin-left: 5px;
  border: none;
  background-color: #d5b483;
  color: white;
  border-radius: 6px;
  &:hover {
    cursor: pointer;
  }
`;
export default ChattingDetail;
