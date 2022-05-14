import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../styled/admin.css';

const Admin = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [partyInfo, setPartyInfo] = useState([]);
  useEffect(() => {
    const getUserInfo = axios
      .get(`${process.env.REACT_APP_API_URL}/admin/alluserinfo`, { withCredentials: true })
      .then((res) => {
        setUserInfo(res.data.userInfo);
        console.log('확인', userInfo);
      });

    const getPartyInfo = axios
      .get(`${process.env.REACT_APP_API_URL}/admin/allpartyinfo`, { withCredentials: true })
      .then((res) => {
        setPartyInfo(res.data.partyInfo);
      });
  }, []);

  const deleteHandler = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/admin/users/${id}`, { withCredentials: true })
      .then(() => window.location.reload());
  };

  const updateHandler = () => {};

  return (
    <Wrapper>
      <Title>유저 정보</Title>
      <br />

      {/* {userInfo.map((info, i) => {
        return ( */}
      <>
        {/* <Table>
              <thead>
                <Tr>
                  <td>ID</td>
                  <td>Email</td>
                  <td>Nickname</td>
                  <td>Phone_number</td>
                  <td>address</td>
                  <td>Image</td>
                  <td>CreatedAt</td>
                  <td>삭제</td>
                </Tr>
              </thead>
              <tbody>
                <Tr>
                  <Td1 key={i}>{info.id}</Td1>
                  <Td2>{info.email}</Td2>
                  <Td3>{info.nickname}</Td3>
                  <Td4>{info.phone_number}</Td4>
                  <Td5>{info.address}</Td5>
                  <Td6>{info.image}</Td6>
                  <Td7>{info.createdAt}</Td7>
                  <Td9>
                    {/* <button onClick={updateHandler}>수정</button> */}
        {/* <Button onClick={() => deleteHandler(info.id)}>삭제</Button>
                  </Td9>
                </Tr>
              </tbody> */}
        {/* </Table>  */}
        <div className="qboard-container">
          <div className="rboard-header"></div>
          <div>
            <table className="board-table">
              <thead className="qboard-thead">
                <tr>
                  <th>ID</th>
                  <th>이메일</th>
                  <th>닉네임</th>
                  <th>전화번호</th>
                  <th>주소</th>
                  {/* <th>이미지</th> */}
                  <th>생성일</th>
                  {/* <th>삭제</th> */}
                </tr>
              </thead>
              {userInfo.map((info, i) => {
                return (
                  <tbody className="qboard-tbody">
                    <Tr>
                      <Td1 key={i}>{info.id}</Td1>
                      <Td2>{info.email}</Td2>
                      <Td3>{info.nickname}</Td3>
                      <Td4>{info.phone_number}</Td4>
                      <Td5>{info.address}</Td5>
                      {/* <Td6>{info.image}</Td6> */}
                      <Td7>{info.createdAt.slice(0, 10)} </Td7>
                      <Button onClick={() => deleteHandler(info.id)}>삭제</Button>
                    </Tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  margin-top: 100px;
`;

const Button = styled.button`
  width: 45px;
  height: 30px;
  font-size: 14px;
`;

const Title = styled.h1`
  justify-content: center;
  display: flex;
  font-size: 30px;
`;

const Tr = styled.tr`
  border: 1px solid gray;
  font-size: 20px;
`;

const Table = styled.table`
  margin: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: 1px solid gray;
  width: 1300px;
  height: 50px;
`;

const Td = styled.td``;

const Td1 = styled.td``;
const Td2 = styled.td``;
const Td3 = styled.td``;
const Td4 = styled.td``;
const Td5 = styled.td``;
const Td6 = styled.td``;
const Td7 = styled.td``;
const Td8 = styled.td``;
const Td9 = styled.td``;

export default Admin;
