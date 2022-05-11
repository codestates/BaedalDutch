import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { visibleAction } from '../../../store/visible';
import axios from 'axios';
import { useState } from 'react';

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
const Introduce = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.2);
`;
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
          dispatch(visibleAction(false));
        }
      })
      .catch((err) => console.log('에러셈'));
  };
  const [changePost, setChangePost] = useState(false);
  const [changeStoreName, setChangeStoreName] = useState(partyData.store_name);
  const [changeDutchMem, setChangeDutchMem] = useState(partyData.member_num);
  const [changeFee, setChangeFee] = useState(partyData.fee);
  const [changeContent, setChangeContent] = useState(partyData.content);
  // const ClosePartyStatus = () => {
  //   return () => {
  //     axios
  //       .patch(`${process.env.REACT_APP_API_URL}/parties/${partyData.id}`, { data: partyData.id })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           console.log('수정성공');
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   };
  // };
  const ChangePostDetail = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/parties/${partyData.id}`,
        {
          store_name: changeStoreName,
          food_category: partyData.food_category,
          member_num: changeDutchMem,
          content: changeContent,
          fee: changeFee,
          address: partyData.address,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )

      .then((res) => {
        if (res.status === 200) {
          console.log('업데이트성공');
          console.log(changeStoreName);
          dispatch(visibleAction(false));
        }
      })
      .catch((err) => console.log('에러셈'));
  };

  return (
    <Container>
      <ButtonMenu>
        <ReturnButton onClick={() => dispatch(visibleAction(false))}>뒤로가기</ReturnButton>
        <ReWriteButton onClick={() => setChangePost(!changePost)}>
          {changePost ? <div onClick={ChangePostDetail}>수정완료</div> : '수정하기'}
        </ReWriteButton>
        <DeleteButton onClick={() => showPostUserDelete(partyData.id)}>삭제하기</DeleteButton>
      </ButtonMenu>
      <Store>
        <FoodImg src={`icon/${partyData.food_category}.png`} alt=""></FoodImg>
        <StoreInformation>
          <StoreName>
            가게명 :
            {changePost ? (
              <input
                value={changeStoreName}
                onChange={(e) => {
                  setChangeStoreName(e.target.value);
                }}
              ></input>
            ) : (
              <span>{partyData.store_name}</span>
            )}
          </StoreName>
          <PartyMember>
            더치인원 :
            {changePost ? (
              <input
                value={changeDutchMem}
                onChange={(e) => {
                  setChangeDutchMem(e.target.value);
                }}
              ></input>
            ) : (
              <span>{partyData.member_num}</span>
            )}
            명
          </PartyMember>
          <Fee>
            배달료 :
            {changePost ? (
              <input
                value={changeFee}
                onChange={(e) => {
                  setChangeFee(e.target.value);
                }}
              ></input>
            ) : (
              <span>{partyData.fee}</span>
            )}
            원
          </Fee>
          <Dutch>더치비용 : {parseInt(partyData.fee / partyData.member_num)} 원</Dutch>
        </StoreInformation>
      </Store>
      <CreatedDate>{formatDate(partyData.updatedAt)}</CreatedDate>
      <Introduce>
        {changePost ? (
          <textarea
            value={changeContent}
            onChange={(e) => {
              setChangeContent(e.target.value);
            }}
          ></textarea>
        ) : (
          <div>{partyData.content}</div>
        )}
      </Introduce>
      <SubmitButton>
        {loginId.id === partyData.leader ? <div onClick>마감하기</div> : <div>신청하기</div>}
      </SubmitButton>
    </Container>
  );
};
export default PartyDetail;
