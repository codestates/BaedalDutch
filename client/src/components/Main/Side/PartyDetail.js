import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { visibleAction } from '../../../store/visible';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  border: 5px solid green;
  flex-direction: column;
`;
const ButtonMenu = styled.div``;
const ReturnButton = styled.button``;
const ReWriteButton = styled.button``;
const DeleteButton = styled.button``;
const Store = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid red;
  margin: 20px 0 20px 0;
`;
const StoreInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const StoreName = styled.div``;
const FoodImg = styled.img`
  width: 20%;
`;
const PartyMember = styled.div``;
const Fee = styled.div``;
const Dutch = styled.div``;
const CreatedDate = styled.div``;
const Introduce = styled.textarea``;
const SubmitButton = styled.button``;

const formatDate = (date) => {
  let d = new Date(date),
    year = '' + d.getFullYear(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    hour = d.getHours(),
    minute = d.getMinutes();
  return `${year}년 ${month < 10 ? `0${month}` : month}월 ${day < 10 ? `0${day}` : day}일 ${
    hour < 10 ? `0${hour}` : hour
  }:${minute < 10 ? `0${minute}` : minute}`;
};

const PartyDetail = () => {
  const dispatch = useDispatch();
  const partyData = useSelector((state) => state.visible.partyData);
  const loginId = useSelector((state) => state.login.loginUser);

  const showPostUserDelete = (id) => {
    console.log('삭제클릭');
    console.log(id);

    axios
      .delete(`${process.env.REACT_APP_API_URL}/parties/${id}`, { parties_id: id })
      .then((res) => {
        if (res.status === 200) {
          console.log('삭제성공');
        }
      })
      .catch((err) => console.log('에러셈'));
  };

  const ClosePartyStatus = () => {
    return () => {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/parties/${partyData.id}`, { data: partyData.id })
        .then((res) => {
          if (res.status === 200) {
            console.log('수정성공');
          }
        })
        .catch((err) => console.log(err));
    };
  };

  return (
    <Container>
      <ButtonMenu>
        <ReturnButton onClick={() => dispatch(visibleAction(false))}>뒤로가기</ReturnButton>
        <ReWriteButton>수정하기</ReWriteButton>
        <DeleteButton onClick={() => showPostUserDelete(partyData.id)}>삭제하기</DeleteButton>
      </ButtonMenu>
      <Store>
        <FoodImg src={`icon/${partyData.food_category}.png`} alt=""></FoodImg>
        <StoreInformation>
          <StoreName>가게명 : {partyData.store_name}</StoreName>
          <PartyMember> 더치인원 : {partyData.member_num} 명</PartyMember>
          <Fee>배달료 : {partyData.fee} 원</Fee>
          <Dutch>더치비용 : {parseInt(partyData.fee / partyData.member_num)} 원</Dutch>
        </StoreInformation>
      </Store>
      <CreatedDate>{formatDate(partyData.updatedAt)}</CreatedDate>
      <Introduce>{partyData.content}</Introduce>
      <SubmitButton>
        {loginId.id === partyData.leader ? <div onClick>마감하기</div> : <div>신청하기</div>}
      </SubmitButton>
    </Container>
  );
};
export default PartyDetail;
