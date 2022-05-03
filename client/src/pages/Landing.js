import styled from 'styled-components';
import dutch1 from '../assets/dutch.jpeg';
import dutch2 from '../assets/dutch2.jpeg';
import ChatModal from '../components/Modal/ChatModal';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid green;
`;
const Introduce1 = styled.img``;
const Introduce2 = styled.img``;
const Introduce3 = styled.img``;

const ChattingButton = styled.button`
  font-family: var(--main-font);
  font-size: 16px;
  display: ${(props) => (props.openPost ? 'none' : 'block')};
  position: fixed;
  bottom: 60px;
  right: 16px;
  border-radius: 100%;
  border: none;
  width: 90px;
  height: 90px;
  background-color: #646eff;
  color: white;
  z-index: 1;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 576px) {
    font-size: 14px;
    width: 70px;
    height: 70px;
  }
`;

function Landing() {
  const [ChattingModal, setChattingModal] = useState(false);

  const openModalChatting = () => {
    setChattingModal(!ChattingModal);
  };
  return (
    <>
      <Container>
        <Introduce1 src={dutch1}></Introduce1>
        <Introduce2 src={dutch2}></Introduce2>
        <Introduce3></Introduce3>
      </Container>
    </>
  );
}

export default Landing;
