import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { showModalAction } from '../store/modal';
import { isLoginAction } from '../store/login';
import { useNavigate } from "react-router-dom";

// import { postSignIn } from "../../Api";
// import { usegate } from "react-rNaviouter-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  height: 500px;
  max-width: 1400px;
  align-items: center;
  margin: auto;
`;
const SigninContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  max-width: 1400px;
  margin: 40px auto 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 5px;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const Text = styled.div`
  margin-right: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;
const AlertBox = styled.div`
  display: flex;
  justify-content: center;
`;

function Signin() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.login.isLogin);

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const login = (email, password) => {
    return axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/signin`,
        {
          email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log('login res::', response);
        if (response.data.accessToken) {
          console.log('135', isLogin);
          dispatch(isLoginAction(true));
          dispatch(showModalAction(false));
          navigate('/main');
        }
        return response.data;
      });
  };

  const handleLogin = async () => {
    const { email, password } = loginInfo;

    if (Object.values(loginInfo).includes('')) {
      setErrorMessage('모든 항목을 입력해 주세요.');
      return;
    }
    try {
      await login(email, password).then(
        () => {
          sessionStorage.setItem('isLogin', 'true');
          // setShowModal(false);
          window.location.reload();
          // dispatch(isLoginAction(true));
          // dispatch(showModalAction(false));
          // navigate('/main');
        },
        (error) => {
          console.log(error);
        },
      )
      navigator('/')
    } catch (err) {
      console.log(err);
    }
  };

  // let data = await postSignIn({ email, password });

  // if (data) {
  //   console.log("user info data: ", data);
  //   sessionStorage.setItem("isLogin", "true");
  // sessionStorage.setItem("userInfo", data.data)
  //   setShowModal(false);
  // }

  const showModal = useSelector((state) => state.modal.showModal);
  // const showModal = useSelector((state) => state.modal.showModal);

  return (
    <>
      <Container>
        <SigninContainer>
          <form onSubmit={(e) => e.preventDefault()}>
            <Title>
              <h1 className="text-grey-600 underline">Sign In</h1>
            </Title>
            <InputWrap>
              <Text>이메일</Text>
              <input type="email" placeholder="이메일" onChange={handleInputValue('email')} />
            </InputWrap>
            <InputWrap>
              <Text>비밀번호</Text>
              <input
                type="password"
                placeholder="비밀번호"
                onChange={handleInputValue('password')}
              />
            </InputWrap>

            <InputWrap className="underline" onClick={() => dispatch(showModalAction(false))}>
              <Link to="/signup">아직 아이디가 없으신가요?</Link>
            </InputWrap>
            <ButtonWrap>
              <button
                className="cursor-pointer px-3 py-2 text-sm text-blue-100 bg-sky-500 rounded hover:bg-sky-400"
                type="submit"
                onClick={handleLogin}
              >
                로그인
              </button>
            </ButtonWrap>
            <AlertBox className="alert-box">{errorMessage}</AlertBox>
          </form>
        </SigninContainer>
      </Container>
    </>
  );
}

export default Signin;
