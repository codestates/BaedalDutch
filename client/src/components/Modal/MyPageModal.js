import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showMyPageAction } from '../../store/modal';
import { useSelector } from 'react-redux';
import { isLoginAction } from '../../store/login';
import { useRef } from 'react';

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
const MyPage = styled.div``;
const LogOut = styled.button``;

const MyPageModal = () => {
  const navigate = useNavigate();
  const showMyPageModal = useSelector((state) => state.modal.showMyPageModal);
  const navDiv = useSelector((state) => state.modal.setNavContainer);
  const dispatch = useDispatch();
  console.log('모달', showMyPageModal);

  const moveToMyProfile = () => {
    dispatch(showMyPageAction(false));
    navigate('/mypage');
  };

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

  useEffect(() => {
    window.addEventListener('click', handleCloseModal);
    return () => {
      window.removeEventListener('click', handleCloseModal);
    };
  });

  return (
    <ModalContiaer ref={modalContainer} showMyPageModal={showMyPageModal}>
      <ModalView>
        <MyPage onClick={moveToMyProfile}>내 설정 페이지</MyPage>
        <LogOut
          onClick={() => {
            dispatch(isLoginAction(false));
            dispatch(showMyPageAction(false));
            navigate('/');
          }}
        >
          로그아웃
        </LogOut>
      </ModalView>
    </ModalContiaer>
  );
};

export default MyPageModal;
