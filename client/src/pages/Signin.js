import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { showModalAction } from '../store/modal';
import { isLoginAction, loginUserAction } from '../store/login';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
  const loginUser = useSelector((state) => state.login.loginUser);

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
        if (response.data.accessToken) {
          dispatch(isLoginAction(true));
          dispatch(loginUserAction(response.data.data));
          dispatch(showModalAction(false));
          sessionStorage.setItem('user', JSON.stringify(response));
          navigate('/main');
        }
        return response.data;
      });
  };

  const handleOauth = () => {
    // eslint-disable-next-line no-restricted-globals
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  };

  const handleLogin = async () => {
    const { email, password } = loginInfo;

    if (Object.values(loginInfo).includes('')) {
      setErrorMessage('?????? ????????? ????????? ?????????.');
      return;
    }
    try {
      await login(email, password).then(
        () => {
          dispatch(isLoginAction(true));
          dispatch(showModalAction(false));
          navigate('/main');
        }
      );
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: '????????? ???????????????.',
        width: 400,
        padding: '3em',
        confirmButtonColor: '#B51D29',
        color: 'black',
        background: '#fff ',
        backdrop: ` 
        rgba(0,0,0,0.4)
      `,
      });
      navigate('/');
    }
  };

  const showModal = useSelector((state) => state.modal.showModal);
  return (
    <>
      <Container>
        <SigninContainer>
          <form onSubmit={(e) => e.preventDefault()}>
            <Title>
              <h1 className="text-grey-600 underline">Sign In</h1>
            </Title>
            <InputWrap>
              <Text>?????????</Text>
              <input type="email" placeholder="?????????" onChange={handleInputValue('email')} />
            </InputWrap>
            <InputWrap>
              <Text>????????????</Text>
              <input
                type="password"
                placeholder="????????????"
                onChange={handleInputValue('password')}
              />
            </InputWrap>

            <InputWrap className="underline" onClick={() => dispatch(showModalAction(false))}>
              <Link to="/signup">?????? ???????????? ????????????????</Link>
            </InputWrap>
            <ButtonWrap>
              <button
                className="cursor-pointer px-3 py-2 text-sm text-blue-100 bg-sky-500 rounded hover:bg-sky-400"
                type="submit"
                onClick={handleLogin}
              >
                ?????????
              </button>
            </ButtonWrap>
            <ButtonWrap>
              <button type="submit" onClick={handleOauth}>
                ??????????????????
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
