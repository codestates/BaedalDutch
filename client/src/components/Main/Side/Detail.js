import styled from 'styled-components';

const Container = styled.div``;

const PartyDetail = () => {
  return (
    <Container>
      {parties.map((party, i) => {
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
export default PartyDetail;
