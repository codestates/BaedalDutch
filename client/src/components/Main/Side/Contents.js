import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { partyDataAction, visibleAction } from '../../../store/visible';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 5px solid green;
`;
const PartyNumber = styled.div`
  display: flex;
  background: white;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  border: 2px solid purple;
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
  const partyData = useSelector((state) => state.visible.partyData);

  const [parties, setParties] = useState([]);

  const getAllData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/parties`, {
      withCredentials: true,
    });
    setParties(data.data);
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

  console.log('파티확인', parties);

  // const handlePostList = (parties.id) => {
  //   setClick(true)
  // }
  const SoloParty = (party) => {
    dispatch(visibleAction(true));
    dispatch(partyDataAction(party));
  };

  console.log('파티 걋수', parties.length);

  return (
    <Container>
      <PartyNumber>
        {parties.length === 0 ? (
          <div>파티가없습니다</div>
        ) : (
          <div>파티목록 : {parties.length}개</div>
        )}
      </PartyNumber>
      {parties.map((party, i) => {
        return (
          <Party
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
                더치인원 : {party.total_num}/{party.member_num} 명
              </PartyMember>
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
