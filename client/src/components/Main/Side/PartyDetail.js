import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { visibleAction } from '../../../store/visible';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  border: 5px solid green;
  flex-direction: column;
`;
const ButtonMenu = styled.div``;
const ReturnButton = styled.button``;
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
const Introduce = styled.textarea``;

const PartyDetail = () => {
  const dispatch = useDispatch();
  const partyData = useSelector((state) => state.visible.partyData);

  return (
    <Container>
      <ButtonMenu>
        <ReturnButton onClick={() => dispatch(visibleAction(false))}>뒤로가기</ReturnButton>
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
      <Introduce>{partyData.content}</Introduce>
    </Container>
  );
};
export default PartyDetail;
