import React from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isLoginAction, loginUserAction } from '../store/login';
import { useEffect } from "react";

const OAuth2RedirectHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // code에 인가코드 할당
  let code = new URL(window.location.href).searchParams.get("code");

  const kakaoCode = (code) => {
    // 카카오 서버로 인가코드를 줌
    axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${code}`,
          { 
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" 
            } 
          }
        )
        .then((result) => {
          // result에 카카오 서버가 준 액세스 토큰이 담겨옴, BaedalDutch 서버로 액세스 토큰을 전달
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/users/signin`,
              {
                code: result.data.access_token,
              },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              dispatch(loginUserAction(res.data.data));
              dispatch(isLoginAction(true));
              navigate('/');
            })
            .catch((e) => {
              alert(e)
              navigate('/');
            });
        });
  }

  useEffect(() => {
    kakaoCode(code);
  }, []);

  return (
    <>
      <div>jadflkj</div>
    </>
  );
};

export default OAuth2RedirectHandler;