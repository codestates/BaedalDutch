import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { partyDataAction, visibleAction } from '../../../store/visible';
import { setPartiesAction } from '../../../store/partyData';
import io from 'socket.io-client';

let socket = io(`${process.env.REACT_APP_API_URL}`, {
  transports: ['websocket', 'polling'],
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const PartyNumber = styled.div`
  display: flex;
  background: white;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Party = styled.div`
  display: flex;
  height: 20%;
  justify-content: space-around;
  border: 1px solid grey;
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
  const dispatch = useDispatch();
  const [parties, setParties] = useState([]);

  const getAllData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/parties`, {
      withCredentials: true,
    });
    setParties(data.data);
    dispatch(setPartiesAction(data.data));
    // getMyInfo();
  };

  //leader === 유저 Id(내 아이디인지아닌지) => 그래야 마감하기/신청하기 혹은 수정/삭제 화면 보이는지 안보이는지 알수있는데 서버에서 막힘
  // const getMyInfo = async () => {

  //   console.log('파티정보', parties);
  //   const participant = await axios
  //     .get(`${process.env.REACT_APP_API_URL}/parties/${parties.id}`)

  //     .then((data) => {
  //       if (data.leader) {
  //       } else if (data.participant) {
  //       }
  //     });
  //   console.log('데이터');
  //   console.log(participant);
  // };

  useEffect(() => {
    getAllData();
  }, []);

  // const handlePostList = (parties.id) => {
  //   setClick(true)
  // }
  const SoloParty = (party) => {
    dispatch(visibleAction(true));
    dispatch(partyDataAction(party));
  };

  return (
    <Container>
      <PartyNumber>
        {parties.length === 0 ? (
          <div>파티가 없습니다</div>
        ) : (
          <div>파티목록 : {parties.length}개</div>
        )}
      </PartyNumber>
      {parties.map((party, i) => {
        return (
          <Party
            key={i}
            onClick={() => {
              SoloParty(party);
            }}
          >
            <FoodImg src={`icon/${party.food_category}.png`} alt=""></FoodImg>
            <PartyDetail>
              <StoreName>가게명 : {party.store_name}</StoreName>
              {/* {party.leader === //id ? <div>수정/삭베</div> : null} */}
              <PartyMember>
                {' '}
                더치인원 : {party.total_num}명 / {party.member_num}명
              </PartyMember>
              <Fee>배달료 : {party.fee}원</Fee>
              <Dutch>더치비용 : {parseInt(party.fee / party.member_num)}원</Dutch>
              {/* {parties.leader === id ? <button>수정하기</button> : <button onClci = {count}>신청학리</button>} */}
            </PartyDetail>
          </Party>
        );
      })}
    </Container>
  );
};
export default Contents;
