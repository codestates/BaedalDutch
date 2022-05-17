import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NLogo from '../assets/baedaldutch.png';
import logo4 from '../assets/Funny_Food_Delivery_Logo_2.png';
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
  background-color: white;
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.1);
  height: 99px;
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
  width: 85px;
  height: 100%;
`;

const MenuWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2%;
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

const UserName = styled.span`
  font-family: var(--main-font);
  font-weight: 500;
  font-size: 18px;
  height: 80px;
  background: #ffffff;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;
  /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); */
  border: none;
  vertical-align: middle;
  transition: box-shadow 0.4s ease;
  margin-left: auto;
  margin-top: 15px;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const loginUser = useSelector((state) => state.login.loginUser);
  const myPage = useSelector((state) => state.modal.showMyPageModal);
  const navContainer = useRef();

  useEffect(() => {
    dispatch(setMyNavDivAction(navContainer));
  });

  return (
    <Nav ref={navContainer}>
      <LogoWrap to="/">
        <Logo src={logo4}></Logo>
      </LogoWrap>
      <MenuWrap>
        {isLogin === true ? (
          <>
            <UserName> {loginUser.nickname + ' '}</UserName>
            <Menu onClick={() => dispatch(showMyPageAction(!myPage))}>
              <img src={loginUser.image} alt="profile" className="img-box" />
            </Menu>
          </>
        ) : (
          <Menu onClick={() => dispatch(showModalAction(true))}>로그인</Menu>
        )}
      </MenuWrap>
    </Nav>
  );
};
export default Navbar;
