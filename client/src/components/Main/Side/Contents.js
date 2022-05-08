import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 5px solid green;
`;
const Party = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid red;
  margin: 20px 0 20px 0;
`;
const FoodImg = styled.img``;
const PartyDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const StoreName = styled.div``;
const PartyMember = styled.div``;
const Fee = styled.div``;
const Dutch = styled.div``;

const Contents = () => {
  const [click, setClick] = useState(false);
  const [parties, setParties] = useState([]);
  const getAllData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/parties`);
    setParties(data.data);
    getMyInfo();
  };

  //leader === 유저 Id(내 아이디인지아닌지) => 그래야 마감하기/신청하기 혹은 수정/삭제 화면 보이는지 안보이는지 알수있는데 서버에서 막힘
  const getMyInfo = async () => {
    console.log('확인', parties);
    const participant = await axios
      .get(`${process.env.REACT_APP_API_URL}/parties/${parties.id}`)
      .then((data) => {
        if (data.leader) {
        } else if (data.participant) {
        }
      });
    console.log('데이터');
    console.log(participant);
  };

  useEffect(() => {
    getAllData();
  }, []);

  // const handlePostList = (parties.id) => {
  //   setClick(true)
  // }

  return (
    <Container>
      {/* {(function ()  {
        if(parties.length === 0){
          return ( 
            <div>
                더치할 목록이 없어요
            </div>
          )
        }else if (click){
          return (<PostDetail click={click} setClick={setClick}/>)
        }else if( !click ){ */}
      {parties.map((party, i) => {
        console.log(party.food_category);
        return (
          <Party>
            <FoodImg src={`icon/${party.food_category}.png`} alt=""></FoodImg>
            <PartyDetail>
              <StoreName>가게명 : {party.store_name}</StoreName>
              {/* {party.leader === //id ? <div>수정/삭베</div> : null} */}
              <PartyMember> 더치인원 : {party.member_num} 명</PartyMember>
              <Fee>배달료 : {party.fee} 원</Fee>
              <Dutch>더치비용 : {parseInt(party.fee / party.member_num)} 원</Dutch>
              {/* {parties.leader === id ? <button>수정하기</button> : <button onClci = {count}>신청학리</button>} */}
            </PartyDetail>
          </Party>
        );
      })}
    </Container>
  );
};
export default Contents;
