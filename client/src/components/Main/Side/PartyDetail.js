import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { visibleAction } from '../../../store/visible';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { showModalAction } from '../../../store/modal';
import io from 'socket.io-client';
import { useState } from 'react';
import { useEffect, useState } from 'react';
import { showModalAction } from '../../../store/modal';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { showModalAction } from '../../../store/modal';
import io from 'socket.io-client';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;
const ButtonMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const ReturnButton = styled.div`
  cursor: pointer;
  font-size: 30px;
`;
const ReWriteButton = styled.button`
  position: relative;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: black;
  left: 120px;
`;
const DeleteButton = styled.button`
  position: relative;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: black;
  left: 10px;
`;
const Store = styled.div`
  display: flex;
  justify-content: space-around;
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
const UpdatedAt = styled.div`
  display: flex;
  padding: 20px;
`;
const Introduce = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.2);
  padding: 5px;
  height: 20%;
  margin: 20px;
`;
const Submit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: rgba(242, 198, 112);
  margin: 10px;
`;

const SubmitButton = styled.div`
  padding: 20px;
`;

const StoreAddress = styled.div`
  display: flex;
  padding: 20px;
`;

const formatDate = (date) => {
  let d = new Date(date),
    year = '' + d.getFullYear(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    hour = d.getHours(),
    minute = d.getMinutes();
  return `${year}??? ${month < 10 ? `0${month}` : month}??? ${day < 10 ? `0${day}` : day}??? ${
    hour < 10 ? `0${hour}` : hour
  }:${minute < 10 ? `0${minute}` : minute}`;
};

let socket;

const PartyDetail = () => {
  const dispatch = useDispatch();
  const partyData = useSelector((state) => state.visible.partyData);
  const loginUser = useSelector((state) => state.login.loginUser);
  const isLogin = useSelector((state) => state.login.isLogin);
  const [isParticipant, setIsParticipant] = useState('');

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_API_URL}`, {
      transports: ['websocket', 'polling'],
    });

    axios
      .get(`${process.env.REACT_APP_API_URL}/parties/${partyData.id}`, { withCredentials: true })
      .then((data) => {
        // ?????? ????????? ??????
        if (Object.keys(data.data)[0] === 'leader') {
          setIsParticipant('leader');
        } else if (Object.keys(data.data)[0] === 'participant') {
          setIsParticipant('participant');
        } else {
          setIsParticipant('newbie');
        }
      });
    if (loginUser) {
      let nickname = loginUser.nickname;
      let roomId = partyData.id;
      socket.emit('joinServer', { nickname, roomId });

      return () => {
        socket.off();
      };
    }
  }, [partyData.total_num]);


    axios
      .get(`${process.env.REACT_APP_API_URL}/parties/${partyData.id}`, { withCredentials: true })
      .then((data) => {
        console.log('data:', data);
        console.log('data.data1:', Object.keys(data.data)[0]);
        // ?????? ????????? ??????
        if (Object.keys(data.data)[0] === 'leader') {
          setIsParticipant('leader');
        } else if (Object.keys(data.data)[0] === 'participant') {
          setIsParticipant('participant');
        } else {
          setIsParticipant('newbie');
        }
      });
    if (loginUser) {
      let nickname = loginUser.nickname;
      let roomId = partyData.id;
      console.log('??????????????? useEffect-socket??? ??????');
      console.log('nickname:', nickname);
      console.log('roomId:', roomId);
      socket.emit('joinServer', { nickname, roomId });

      return () => {
        socket.off();
      };
    }
  }, [partyData.total_num]);

  // ????????????
  const showPostUserDelete = (id) => {
    let nickname = loginUser.nickname;
    socket.emit('leaveRoom', { id, nickname });

    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/parties/${id}`,
        { parties_id: id },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(visibleAction(false));
          window.location.replace('/main');
        }
      })
      .catch((err) => console.log('?????????'));
  };
  const [changePost, setChangePost] = useState(false);
  const [changeStoreName, setChangeStoreName] = useState(partyData.store_name);
  const [changeDutchMem, setChangeDutchMem] = useState(partyData.member_num);
  const [changeFee, setChangeFee] = useState(partyData.fee);
  const [changeContent, setChangeContent] = useState(partyData.content);

  // ????????????
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
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch(visibleAction(false));          
          await window.location.replace('/main');
        }
      })
      .catch((err) => console.log('?????????'));
  };

  // ????????????
  const handleNewbie = () => {
    let id = partyData.id;
    let nickname = loginUser.nickname;
    let roomName = partyData.store_name;
    let categoryFood = partyData.food_category;
    socket.emit('joinRoom', { id, nickname, roomName, categoryFood });

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/orders/${partyData.id}`,
        { id: partyData.id },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      .then((data) => {
        console.log('data??????', data);
      });
    setIsParticipant('participant');
    dispatch(visibleAction(false));
    window.location.replace('/main');
  };

  // ????????????
  const handleParticipate = () => {
    let roomId = partyData.id;
    let nickname = loginUser.nickname;

    socket.emit('leaveRoom', { roomId, nickname });
    axios.delete(`${process.env.REACT_APP_API_URL}/orders/${partyData.id}`, {
      withCredentials: true,
    });
    setIsParticipant('newbie');
    dispatch(visibleAction(false));
    window.location.replace('/main');
  };
  // ????????????
  const handleLeader = () => {
    axios.patch(`${process.env.REACT_APP_API_URL}/parties/${partyData.id}`, {
      withCredentials: true,
    });
    window.location.replace('/main');
  };

  return (
    <Container>
      <ButtonMenu>
        <ReturnButton onClick={() => dispatch(visibleAction(false))}>????????????</ReturnButton>
        {loginId.id === partyData.leader ? (
        <ReturnButton onClick={() => dispatch(visibleAction(false))}>
          <i className="fa-solid fa-circle-arrow-left"></i>
        </ReturnButton>
        {loginUser.id === partyData.leader ? (
          <>
            <ReWriteButton onClick={() => setChangePost(!changePost)}>
              {changePost ? <div onClick={ChangePostDetail}>????????????</div> : '????????????'}
            </ReWriteButton>
            <DeleteButton onClick={() => showPostUserDelete(partyData.id)}>????????????</DeleteButton>
          </>
        ) : null}
      </ButtonMenu>
      <Store>
        <FoodImg src={`icon/${partyData.food_category}.png`} alt=""></FoodImg>
        <StoreInformation>
          <StoreName>
            ????????? :
            {changePost ? (
              <input
                value={changeStoreName}
                onChange={(e) => {
                  setChangeStoreName(e.target.value);
                }}
              ></input>
            ) : (
            )}
          </StoreName>
          <PartyMember>
            ???????????? :
            {changePost ? (
              <input
                value={changeDutchMem}
                onChange={(e) => {
                  setChangeDutchMem(e.target.value);
                }}
              ></input>
            ) : (
              <span>{` ${partyData.total_num}??? / ${partyData.member_num}???`}</span>
            )}
              <span>{` ${partyData.total_num} / ${partyData.member_num}`}</span>
            )}
            ???
              <span>{` ${partyData.total_num}??? / ${partyData.member_num}???`}</span>
            )}
              <span>{` ${partyData.total_num}??? / ${partyData.member_num}???`}</span>
            )}
          </PartyMember>
          <Fee>
            ????????? :
            {changePost ? (
              <input
                value={changeFee}
                onChange={(e) => {
                  setChangeFee(e.target.value);
                }}
              ></input>
            ) : (
              <span>{` ${partyData.fee}`}</span>
            )}
            ???
          </Fee>
          <Dutch>???????????? : {parseInt(partyData.fee / partyData.member_num)} ???</Dutch>
        </StoreInformation>
      </Store>
      <CreatedDate>{formatDate(partyData.updatedAt)}</CreatedDate>
          <Dutch>???????????? : {parseInt(partyData.fee / partyData.member_num)}???</Dutch>
        </StoreInformation>
      </Store>
      <UpdatedAt>???????????? : {formatDate(partyData.updatedAt)}</UpdatedAt>
      <StoreAddress>?????? : {partyData.address}</StoreAddress>
          <Dutch>???????????? : {parseInt(partyData.fee / partyData.member_num)}???</Dutch>
        </StoreInformation>
      </Store>
      <UpdatedAt>???????????? : {formatDate(partyData.updatedAt)}</UpdatedAt>
      <StoreAddress>?????? : {partyData.address}</StoreAddress>
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
        {loginId.id === partyData.leader ? <div onClick>????????????</div> : <div>????????????</div>}
      </SubmitButton>
      <Submit>
        {(function () {
          if (isLogin === false) {
            return (
              <SubmitButton onClick={() => dispatch(showModalAction(true))}>????????????</SubmitButton>
            );
          } else if (!partyData) {
            return null;
          } else if (isParticipant === 'leader') {
            return <SubmitButton onClick={handleLeader}> ???????????? </SubmitButton>;
          } else if (isParticipant === 'newbie') {
            return <SubmitButton onClick={handleNewbie}> ???????????? </SubmitButton>;
          } else if (isParticipant === 'participant') {
            return <SubmitButton onClick={handleParticipate}> ???????????? </SubmitButton>;
          } else if (partyData.closed === true) {
            return <SubmitButton> ??????????????????????????? </SubmitButton>;
          } else if (partyData.total_num === partyData.member_num) {
            return <SubmitButton> ??????????????????????????? </SubmitButton>;
          }
        })()}
      </Submit>
    </Container>
  );
};
export default PartyDetail;