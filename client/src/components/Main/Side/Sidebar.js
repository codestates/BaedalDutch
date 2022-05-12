import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Contents from './Contents';
import PartyDetail from './PartyDetail';

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

// const Parties = styled.div`
//   display: flex;
//   width: 100%;
//   height: 10%;
// `;

// const NearParty = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 2px solid black;
//   height: 100%;
//   width: 100%;
//   text-align: center;
// `;

// const MyParty = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 2px solid black;
//   height: 100%;
//   width: 100%;
// `;

const SidebarContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const Sidebar = () => {
  const showDetail = useSelector((state) => state.visible.showDetail);

  return (
    <Container>
      <Sidebarbox>
        {/* <Parties>
          <NearParty>가까운 파티</NearParty>
          <MyParty>내 파티</MyParty>
        </Parties> */}
        <SidebarContent>{showDetail ? <PartyDetail /> : <Contents />}</SidebarContent>
      </Sidebarbox>
    </Container>
  );
};

export default Sidebar;
