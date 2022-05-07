import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const FoodImg = styled.img``;
const StoreName = styled.div``;
const PartyMember = styled.div``;
const Fee = styled.div``;
const Dutch = styled.div``;

const Contents = () => {
  const [parties, setParties] = useState([]);
  const getAllData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/parties`);
    setParties(data.data);
  };

  //writeUser_id === Id(내 아이디인지아닌지) => 그래야 마감하기/신청하기 혹은 수정/삭제 화면 보이는지 안보이는지 알수있는데 서버에서 막힘
  const getMyInfo = async () => {
    console.log('데이터들어오나');
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/users/mypage`);
    console.log('데이터');
    console.log(data);
  };

  useEffect(() => {
    getAllData();
    getMyInfo();
  }, []);

  console.log('파리', parties);

  return (
    <Container>
      {parties.map((party, i) => {
        console.log(party.food_category);
        return (
          <div>
            <StoreName>{party.store_name}</StoreName>
            <FoodImg src={`icon/${party.food_category}.png`} alt=""></FoodImg>
            <PartyMember> {party.member_num} 명</PartyMember>
            <Fee>{party.fee} 원</Fee>
            <Dutch>{parseInt(party.fee / party.member_num)} 원</Dutch>
          </div>
        );
      })}
    </Container>
  );
};
export default Contents;
