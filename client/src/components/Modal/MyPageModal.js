import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showMyPageAction } from '../../store/modal';
import { useSelector } from 'react-redux';
import { isLoginAction } from '../../store/login';
import { useRef } from 'react';
import axios from 'axios';

const ModalContiaer = styled.div`
  position: fixed;
  display: ${(props) => (props.showMyPageModal ? 'block' : 'none')};
  z-index: 1;
  justify-content: flex-end;
  right: 0;
  top: 30px;
  width: 270px;
  height: 20%;
  margin-top: 70px;
  z-index: 999;
  border: 1px solid black;
  @media screen and (max-width: 500px) {
    width: 130px;
  }
`;
const ModalView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  justify-content: space-around;
  font-size: 18px;
  font-weight: bold;
`;
const MyPageButton = styled.div``;
const AdminButton = styled.div``;
const LogOut = styled.button``;

const MyPageModal = () => {
  const navigate = useNavigate();
  const showMyPageModal = useSelector((state) => state.modal.showMyPageModal);
  const loginUser = useSelector((state) => state.login.loginUser)
  const navDiv = useSelector((state) => state.modal.setNavContainer);
  const dispatch = useDispatch();

  const moveToMyProfile = () => {
    dispatch(showMyPageAction(false));
    navigate('/mypage');
  };

  const moveToAdminPage = () => {
    dispatch(showMyPageAction(false));
    navigate('/admin')
  }

  const modalContainer = useRef();

  const handleCloseModal = ({ target }) => {
    if (
      showMyPageModal &&
      !modalContainer?.current?.contains(target) &&
      !navDiv?.current?.contains(target)
    ) {
      dispatch(showMyPageAction(false));
    }
  };

  const handleLogoutClick = (e) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/logout`, {}, { withCredentials: true })
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseModal);
    return () => {
      window.removeEventListener('click', handleCloseModal);
    };
  });

  return (
    <ModalContiaer ref={modalContainer} showMyPageModal={showMyPageModal}>
      <ModalView>
        <MyPageButton onClick={moveToMyProfile}>내 설정 페이지</MyPageButton>
        {loginUser.nickname === 'admin' ?
        <AdminButton onClick={moveToAdminPage}>어드민 페이지</AdminButton> : null
        }
        <LogOut
          onClick={() => {
            dispatch(isLoginAction(false));
            dispatch(showMyPageAction(false));
            navigate('/');
            handleLogoutClick();
          }}
        >
          로그아웃
        </LogOut>
      </ModalView>
    </ModalContiaer>
  );
};

export default MyPageModal;
