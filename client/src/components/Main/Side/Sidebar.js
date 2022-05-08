import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { showWriteAction } from '../../../store/modal';
import Contents from './Contents';

const Container = styled.div`
  background-color: #e3ecf1;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const Sidebarbox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  background-color: white;
  border-left: 4px solid #202020;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: #202020;
  width: 500px;
  height: 90%;
  z-index: 99;
`;

const Parties = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
`;

const NearParty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  height: 100%;
  width: 100%;
  text-align: center;
`;

const MyParty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  height: 100%;
  width: 100%;
`;

const SidebarContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const WriteButton = styled.button``;

const ChattingButton = styled.button``;

const Sidebar = () => {
  const dispatch = useDispatch();
  const showWriteModal = useSelector((state) => state.modal.showWriteModal);

  return (
    <Container>
      <Sidebarbox>
        <Parties>
          <NearParty>가까운 파티</NearParty>
          <MyParty>내 파티</MyParty>
        </Parties>
        <SidebarContent>
          <Contents />
        </SidebarContent>
      </Sidebarbox>
    </Container>
  );
};

export default Sidebar;
