import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NLogo from '../assets/baedaldutch.png';
import { useSelector, useDispatch } from 'react-redux';
import { setMyNavDivAction, showModalAction, showMyPageAction } from '../store/modal';
import { useRef } from 'react';
import { useEffect } from 'react';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 500;
  width: 100%;
  background-color: yellow;
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.1);
  height: 100px;
`;

const LogoWrap = styled(Link)`
  margin-left: 20px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  height: 70px;
  width: 10%;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const MenuWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 5%;
  width: 30%;
`;

const Menu = styled.button`
  border: none;
  background-color: transparent;
  text-decoration: none;
  color: black;
  font-size: 18px;
  cursor: pointer;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const myPage = useSelector((state) => state.modal.showMyPageModal);
  const navContainer = useRef();
  console.log('로그인체크', isLogin);

  useEffect(() => {
    dispatch(setMyNavDivAction(navContainer));
  });

  return (
    <Nav ref={navContainer}>
      <LogoWrap to="/">
        <Logo src={NLogo}></Logo>
      </LogoWrap>
      <MenuWrap>
        {isLogin === true ? (
          <Menu onClick={() => dispatch(showMyPageAction(!myPage))}>마이페이지</Menu>
        ) : (
          <Menu onClick={() => dispatch(showModalAction(true))}>로그인</Menu>
        )}
      </MenuWrap>
    </Nav>
  );
};
export default Navbar;
