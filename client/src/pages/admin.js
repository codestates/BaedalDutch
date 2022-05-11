import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Admin = () => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const getUserInfo = axios
      .get(`${process.env.REACT_APP_API_URL}/admin/alluserinfo`, { withCredentials: true })
      .then((res) => {
        setUserInfo(res.data.userInfo);
        console.log('확인', userInfo);
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
      <div>
        {userInfo.map((info, i) => {
          return (
            <>
              <Table>
                <thead>
                  <Tr>
                    <td>ID</td>
                    <td>Email</td>
                    <td>Nickname</td>
                    <td>Phone_number</td>
                    <td>address</td>
                    <td>Image</td>
                    <td>CreatedAt</td>
                    <td>UpdatedAt</td>
                    <td>삭제</td>
                  </Tr>
                </thead>
                <tbody>
                  <tr>
                    <td key={i}>{info.id}</td>
                    <td>{info.email}</td>
                    <td>{info.nickname}</td>
                    <td>{info.phone_number}</td>
                    <td>{info.address}</td>
                    <td>{info.image}</td>
                    <td>{info.createdAt}</td>
                    <td>{info.updatedAt}</td>
                    <td>
                      {/* <button onClick={updateHandler}>수정</button> */}
                      <button onClick={() => deleteHandler(info.id)}>삭제</button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  margin-top: 100px;
`;

const Title = styled.div`
  margin: 0 auto;
  display: flex;
`;

const Tr = styled.tr`
  margin: auto;
  border: 1px solid gray;
`;

const Table = styled.table`
  border: 1px solid gray;
`;

export default Admin;
