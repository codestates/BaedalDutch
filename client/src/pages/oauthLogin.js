import React from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { useEffect } from "react";

const OAuth2RedirectHandler = () => {
  let code = new URL(window.location.href).searchParams.get("code");
  const REACT_APP_REST_API_KEY = '123b36cb823c40ff5618ff1d05cbec6b'
  const REDIRECT_URI = 'http://localhost:3000/oauth/kakao'

  const kakaoCode = (code) => {
    axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((result) => {
          console.log(result);
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/oauth/kakao`,
              {
                code: result.data.access_token,
              },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              console.log(res);

              window.location.replace("/");
            })
            .catch((e) => {
              alert(e)
              window.location.replace("/");
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