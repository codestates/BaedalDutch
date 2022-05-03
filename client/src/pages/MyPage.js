import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DaumPostcode from 'react-daum-postcode';
// import ProfileImage from './ProfileImage';
import Swal from 'sweetalert2';
import axios from 'axios';

const { kakao } = window;

function MyPage() {
  const [Images, setImages] = useState(null);

  // 주소
  const [visible, setVisible] = useState(false);

  // 회원탈퇴 테스트
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login.loginUser);

  const navigate = useNavigate();
  const nicknameRegExp = /^[a-zA-Zㄱ-힣0-9]*$/;
  const passwordRegExp = /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]{8,16}$/;
  const phone_numberRegExp = /^[0-9]{10,11}$/;

  const [settingUserinfo, setSettingUserinfo] = useState({
    id: loginUser.id,
    image: loginUser.image,
    nickname: loginUser.nickname,
    phone_number: loginUser.phone_number,
    address: loginUser.address,
    password: loginUser.password,
    passwordCheck: loginUser.passwordCheck,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [message, setMessage] = useState({
    nicknameMessage: '',
    phone_numberMessage: '',
    passwordMessage: '',
    passwordCheckMessage: '',
    errorMessage: '',
  });

  const [validation, setValidation] = useState({
    nicknameValidation: false,
    phone_numberValidation: false,
    passwordValidation: false,
    passwordCheckValidation: false,
  });

  const [changeInfoBtn, setChangeInfoBtn] = useState(false);

  useEffect(() => {
    // window.addEventListener('resize', closePostList);
    // return () => {
    //   window.addEventListener('resize', closePostList);
    // };
  }, []);

  // 마이페이지 회원정보 유효성검사
  const settingOnChange = (key) => (e) => {
    setSettingUserinfo({ ...settingUserinfo, [key]: e.target.value });

    if (key === 'nickname') {
      if (
        e.target.value.length < 2 ||
        e.target.value.length > 10 ||
        !nicknameRegExp.test(e.target.value)
      ) {
        setMessage({ ...message, nicknameMessage: '2~10자 한글, 영어 , 숫자만 사용 가능 합니다' });
        setValidation({ ...validation, nicknameValidation: true });
      } else {
        setValidation({ ...validation, nicknameValidation: false });
        setMessage({ ...message, nicknameMessage: '' });
      }
    }

    if (key === 'phone_number') {
      if (
        e.target.value.length < 10 ||
        e.target.value.length > 11 ||
        !phone_numberRegExp.test(e.target.value)
      ) {
        setMessage({ ...message, phone_numberMessage: '"-" 하이픈 없이 번호만 입력해주세요.' });
        setValidation({ ...validation, phone_numberValidation: true });
      } else {
        setValidation({ ...validation, phone_numberValidation: false });
        setMessage({ ...message, phone_numberMessage: '' });
      }
    }

    if (key === 'password') {
      if (!passwordRegExp.test(e.target.value)) {
        setMessage({
          ...message,
          passwordMessage: '8~16자 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다',
        });
        setValidation({ ...validation, passwordValidation: true });
      } else {
        setValidation({ ...validation, passwordValidation: false });
        setMessage({ ...message, passwordMessage: '' });
      }
    }
    if (key === 'passwordCheck') {
      if (e.target.value !== settingUserinfo.password) {
        setMessage({ ...message, passwordCheckMessage: '비밀번호가 일치하지 않습니다' });
        setValidation({ ...validation, passwordCheckValidation: true });
      } else {
        setValidation({ ...validation, passwordCheckValidation: false });
        setMessage({ ...message, passwordCheckMessage: '' });
      }
    }
  };

  const clickHomelBtn = () => {
    navigate('/');
  };

  // 마이페이지 수정
  const handleUserEdit = () => {
    const { nickname, phone_number, address, password, passwordCheck } = settingUserinfo;
    setChangeInfoBtn(true);
    if (changeInfoBtn) {
      if (
        !nickname ||
        !phone_number ||
        !address ||
        ((!password || !passwordCheck) && password !== passwordCheck)
      ) {
        setMessage({ ...message, errorMessage: '모든 항목은 필수입니다' });
        setValidation({ ...validation, errorValidation: true });
      } else if (message.nicknameMessage === '이미 존재하는 닉네임입니다') {
        setMessage({ ...message, errorMessage: '다시 확인 해주세요' });
        setValidation({ ...validation, errorValidation: true });
      } else {
        // dispatch(axiosUserEdit(settingUserinfo));
        setMessage({ ...message, errorMessage: '' });
        Swal.fire({
          title: '수정 완료',
          width: 500,
          padding: '3em',
          confirmButtonColor: '#B51D29',
          color: 'black',
          background: '#fff ',
          backdrop: ` 
          rgba(0,0,0,0.4)
        `,
        });
        setChangeInfoBtn(!changeInfoBtn);
      }
    }
  };

  const handleOnBlurNickName = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/checkNickname`,
        { nickname: e.target.value },
        { withCredentials: true },
      )
      .then((res) => {
        if (loginUser.nickname === e.target.value) {
          setValidation({ ...validation, nicknameValidation: false });
          setMessage({ ...message, nicknameMessage: '' });
        } else if (
          e.target.value.length < 2 ||
          e.target.value.length > 10 ||
          !nicknameRegExp.test(e.target.value)
        ) {
          setMessage({
            ...message,
            nicknameMessage: '2~10자 한글, 영어 , 숫자만 사용 가능 합니다',
          });
          setValidation({ ...validation, nicknameValidation: true });
        } else if (res.data.message === 'already nickname exist') {
          setMessage({ ...message, nicknameMessage: '이미 존재하는 닉네임입니다' });
          setValidation({ ...validation, nicknameValidation: true });
        } else {
          setValidation({ ...validation, nicknameValidation: false });
          setMessage({ ...message, nicknameMessage: '' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //회원탈퇴 테스트
  const handleUserDelete = () => {
    Swal.fire({
      title: '탈퇴하시겠습니까?',
      padding: '3em',
      showCancelButton: true,
      confirmButtonColor: '#D4AA71',
      cancelButtonColor: '#B51D29',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.value) {
        // dispatch(axiosUserDelete());
        navigate('/');
      } else {
      }
    });
  };
  // 주소 검색 api
  const handleComplete = (loginUser) => {
    let fullAddress = loginUser.address;
    let extraAddress = '';

    if (loginUser.addressType === 'R') {
      if (loginUser.bname !== '') {
        extraAddress += loginUser.bname;
      }
      if (loginUser.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${loginUser.buildingName}` : loginUser.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setSettingUserinfo({ ...settingUserinfo, address: fullAddress });
    setVisible(false);
  };

  // 주소 검색시 lat, lng 받기
  const newSearchAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      if (status === 'OK') {
        const newAddSearch = result[0];
        setSettingUserinfo({ ...settingUserinfo, lat: newAddSearch.y, lng: newAddSearch.x });
      }
    };
    geocoder.addressSearch(`${settingUserinfo.address}`, callback);
  };
  console.log(settingUserinfo);

  // 프로필사진
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  return (
    <div>
      <Navbar />
      <Wrapper>
        <MapDiv>
          <MyPageDiv>
            {/* 프로필사진 */}
            {/* <ProfileImage updateImages={updateImages} /> */}
            {/* --------------------------회원정보 수정------------------------- */}
            {changeInfoBtn ? (
              // 회원정보 수정중인 상태
              <MyPageForm onSubmit={(e) => e.preventDefault()}>
                <InputTitle>닉네임</InputTitle>
                <InputField
                  onBlur={(e) => handleOnBlurNickName(e)}
                  defaultValue={loginUser.nickname}
                  onChange={settingOnChange('nickname')}
                />
                {settingUserinfo.nickname.length > 0 && validation.nicknameValidation ? (
                  <Err>{message.nicknameMessage}</Err>
                ) : null}
                <InputTitle>전화번호</InputTitle>
                <InputField
                  defaultValue={loginUser.phone_number}
                  onChange={settingOnChange('phone_number')}
                />
                {settingUserinfo.phone_number.length > 0 && validation.phone_numberValidation ? (
                  <Err>{message.phone_numberMessage}</Err>
                ) : null}
                <InputTitle>주소</InputTitle>
                {visible ? (
                  <div className="test">
                    <CloseBtn onClick={() => setVisible(false)}>닫기</CloseBtn>
                    <DaumPostcode
                      onComplete={handleComplete}
                      onSuccess={newSearchAddress}
                      height={700}
                      className="DaumPost"
                    />
                  </div>
                ) : null}

                {settingUserinfo.address === '' ? (
                  <AddressInputDiv onClick={() => setVisible(true)}>
                    주소를 검색 해주세요
                  </AddressInputDiv>
                ) : (
                  <AddressInputDiv
                    onClick={() => setVisible(true)}
                    onChange={settingOnChange('address')}
                  >
                    {settingUserinfo.address}
                  </AddressInputDiv>
                )}
                <InputTitle>비밀번호</InputTitle>
                <InputFieldPassWordSize type="password" onChange={settingOnChange('password')} />
                {validation.passwordValidation ? <Err>{message.passwordMessage}</Err> : null}
                <InputTitle>비밀번호확인</InputTitle>
                <InputFieldPassWordSize
                  type="password"
                  onChange={settingOnChange('passwordCheck')}
                />
                {validation.passwordCheckValidation ? (
                  <Err>{message.passwordCheckMessage}</Err>
                ) : null}
                <SignUpToLogin onClick={handleUserDelete}>회원탈퇴</SignUpToLogin>
                <Err>{message.errorMessage}</Err>
                <EditButton onClick={handleUserEdit}>수정완료</EditButton>
              </MyPageForm>
            ) : (
              // 기존의 회원정보
              <MyPageForm onSubmit={(e) => e.preventDefault()}>
                <InputTitle>닉네임</InputTitle>
                <Div>{loginUser.nickname}</Div>
                <InputTitle>전화번호</InputTitle>
                <Div>{loginUser.phone_number}</Div>
                <InputTitle>주소</InputTitle>
                <Div>{loginUser.address}</Div>
                <InputTitle>비밀번호</InputTitle>
                <InputFieldPassWord />
                <InputTitle>비밀번호확인</InputTitle>
                <InputFieldPassWord />
                <SignUpToLogin onClick={handleUserDelete}>회원탈퇴</SignUpToLogin>
                <EditButton onClick={handleUserEdit}>수정하기</EditButton>
              </MyPageForm>
            )}
          </MyPageDiv>
        </MapDiv>
        <HomeButton onClick={clickHomelBtn}>Home</HomeButton>
      </Wrapper>
    </div>
  );
}

const CloseBtn = styled.button`
  display: block;
  margin-left: 400px;
  z-index: 100;
  padding: 7px;
  width: 100px;
  color: white;
  background-color: #b51d29;
  border: none;
  border-radius: 6px;
  @media (max-width: 576px) {
    margin-left: 240px;
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const MapDiv = styled.div`
  float: left;
  margin-right: -460px;
  padding-right: 460px;
  background-color: #ffffff;
  width: 100%;
  height: calc(100vh - 100px);
  overflow: auto;
  @media (max-width: 576px) {
    display: ${(props) => (props.openPost ? 'none' : 'block')};
    visibility: visible;
    margin-right: 0px;
    padding-right: 0px;
    width: 576px;
  }
`;

const MyPageDiv = styled.div`
  margin: auto;
  background-color: #ffffff;
  width: 95%;
  height: calc(100vh - 100px);
`;

const HomeButton = styled.button`
  font-family: var(--main-font);
  font-size: 12px;
  display: ${(props) => (props.openPost ? 'none' : 'block')};
  position: fixed;
  bottom: 60px;
  right: 16px;
  border-radius: 100%;
  border: none;
  width: 60px;
  height: 60px;
  background-color: #111111;
  color: white;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 576px) {
    width: 70px;
    height: 70px;
    font-size: 14px;
  }
  @media (max-width: 400px) {
    width: 70px;
    height: 70px;
    bottom: 75px;
  }
`;

const MyPageForm = styled.form`
  float: left;
  margin-left: 50px;
  margin-top: 100px;
`;

const InputTitle = styled.div`
  margin-top: 10px;
  font-size: 18px;
  @media (max-width: 576px) {
    margin-top: 3px;
    font-size: 18px;
  }
  @media (max-width: 400px) {
    margin-left: -20px;
    font-size: 16px;
  }
`;

const InputField = styled.input`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 56px;
  font-size: 18px;
  margin-top: 10px;
  border: solid #c4c4c4 1px;
  border-radius: 3px;
  padding-left: 5px;
  &:focus {
    outline: none;
    border: 1px solid #d9c6ac;
  }
  @media (max-width: 576px) {
    width: 340px;
    height: 46px;
    border-radius: 3px;
  }
  @media (max-width: 400px) {
    width: 300px;
    height: 46px;
    bottom: 140px;
    margin-left: -21px;
    margin-top: 1px;
    font-size: 16px;
  }
`;

const InputFieldPassWordSize = styled.input`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 56px;
  font-size: 18px;
  margin-top: 10px;
  border: solid #c4c4c4 1px;
  border-radius: 3px;
  padding-left: 5px;
  &:focus {
    outline: none;
    border: 1px solid #d9c6ac;
  }
  @media (max-width: 576px) {
    width: 340px;
    height: 46px;
    border-radius: 3px;
  }
  @media (max-width: 400px) {
    width: 240px;
    height: 46px;
    bottom: 140px;
    margin-left: -21px;
    margin-top: 1px;
    font-size: 16px;
  }
`;

const InputFieldPassWord = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 56px;
  font-size: 18px;
  margin-top: 10px;
  border: solid #e2e2e2 1px;
  padding-left: 5px;
  @media (max-width: 400px) {
    width: 240px;
    height: 46px;
    bottom: 140px;
    margin-left: -21px;
    margin-top: 1px;
    font-size: 16px;
  }
`;

const Div = styled.div`
  width: 500px;
  height: 56px;
  font-size: 16px;
  color: #525252;
  margin-top: 10px;
  @media (max-width: 400px) {
    margin-left: -20px;
    font-size: 16px;
    margin-bottom: -21px;
  }
`;

const EditButton = styled.button`
  float: right;
  width: 200px;
  height: 56px;
  background-color: #111111;
  color: white;
  border: none;
  border-radius: 6px;
  margin-top: 30px;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 576px) {
    width: 150px;
    height: 46px;
    float: left;
    margin-left: 20%;
  }
  @media (max-width: 400px) {
    width: 150px;
    height: 46px;
    float: left;
    margin-left: 5%;
    font-size: 16px;
  }
  @media (max-width: 380px) {
    width: 140px;
    height: 40px;
    float: left;
    margin-top: -27px;
    margin-left: 80px;
    font-size: 16px;
  }
`;

const SignUpToLogin = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: gray;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 400px) {
    margin-left: -20px;
  }
`;

const Err = styled.div`
  font-size: 14px;
  color: red;
  margin-top: 2px;
`;

const AddressInputDiv = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  width: 500px;
  height: 56px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px #c4c4c4 solid;
  border-radius: 3px;
  color: gray;
  padding-left: 5px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 576px) {
    width: 340px;
    height: 46px;
  }
  @media (max-width: 400px) {
    width: 300px;
    height: 46px;
    bottom: 140px;
    margin-left: -21px;
    margin-top: -5px;
    font-size: 16px;
  }
`;

export default MyPage;