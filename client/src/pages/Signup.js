import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, ErrorMessage, Form, Input, Label } from '../styled/signup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import { useState } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const AddressDiv = styled.div`
  display: flex;
`;

const CloseBtn = styled.button`
  display: block;
  position: absolute;
  top: 70px;
  right: 15px;
  z-index: 100;
  padding: 7px;
  width: 100px;
  color: white;
  background-color: #b51d29;
  border: none;
  border-radius: 6px;
`;

const AddressInputDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin: 20px;
  width: 100%;
  border: none;
  text-decoration: none;
  border-bottom: ${(props) => (props.error ? '2px solid red' : '2px solid rgba(0, 0, 0, 0.2)')};
  &:focus {
    outline: none;
  }
`;

const addressStyle = {
  display: 'block',
  position: 'absolute',
  top: '97px',
  left: '20px',
  zIndex: '100',
  padding: '7px',
  width: '90%',
  height: '80%',
};

const Signup = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const [writeInfo, setWriteInfo] = useState({
    food_category: '',
    member_num: '',
    address: '',
    lat: '',
    lng: '',
  });

  const handleComplete = (data) => {
    console.log('데이터확인', data);
    console.log('작동확인');
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setWriteInfo({ ...writeInfo, address: fullAddress });
    console.log('첫번째 어드레스', writeInfo.address);
  };

  const test = () => {
    console.log('늦게하더라도 늦게찍힘?');
    console.log('비동기???', writeInfo.address);
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      console.log('상태?', status);
      if (status === 'OK') {
        const newAddSearch = result[0];
        setWriteInfo({ ...writeInfo, lat: newAddSearch.y, lng: newAddSearch.x });
      }
    };
    geocoder.addressSearch(`${writeInfo.address}`, callback);
  };

  const onSubmit = () => {
    const { nickname, email, password, phone_number, image, address } = getValues();
    console.log(nickname, email, password, phone_number, image, address);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/signup`,
        {
          email,
          password,
          nickname,
          phone_number,
          image: '12',
          address,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      .then((res) => {
        navigate('/');
      });
  };
  // if (res.accessToken) {
  //   console.log('체크');
  //   navigate('/');
  // }

  // return;

  const nickPattern = {
    value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
    message: '숫자, 영어, 한글만 입력해주세요',
  };

  const emailPattern = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: '이메일 형식으로 입력해주세요',
  };
  const passwordPattern = {
    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    message: '8자이상 / 영문 / 숫자 / 특수문자를 조합해주세요',
  };
  const phonePattern = {
    value: /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
    message: '휴대전화 번호를 입력해 주세요',
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label for="nickname">닉네임</Label>
        <Input
          error={errors.nickname?.message}
          {...register('nickname', {
            required: '닉네임을 꼭 입력해 주세요',
            pattern: nickPattern,
            minLength: { value: 2, message: '최소 2 글자 이상을 입력해 주세요' },
            maxLength: { value: 9, message: '최대 9 글자 이하로 입력해 주세요' },
          })}
          placeholder="2~9글자"
          id="nickname"
        ></Input>
        <ErrorMessage>{errors.nickname?.message}</ErrorMessage>
        <Label for="email">이메일</Label>
        <Input
          error={errors.email?.message}
          {...register('email', {
            required: '이메일을 꼭 입력해 주세요',
            pattern: emailPattern,
          })}
          placeholder="주로 사용하시는 이메일을 입력해주세요"
          id="email"
        ></Input>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <Label for="password">비밀번호</Label>
        <Input
          error={errors.password?.message}
          {...register('password', {
            required: '비밀번호를 꼭 입력해 주세요',
            pattern: passwordPattern,
          })}
          placeholder="패스워드를 입력하세요"
          id="password"
          type="password"
        ></Input>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Label for="passwordCheck">비밀번호 확인</Label>
        <Input
          type="password"
          error={errors.passwordCheck?.message}
          {...register('passwordCheck', {
            required: '비밀번호를 똑같이 입력해 주세요',
            validate: {
              matchpassword: (value) => {
                const { password } = getValues();
                return password === value || '비밀번호가 일치하지 않습니다';
              },
            },
          })}
          placeholder="패스워드를 재입력하세요"
          id="passwordCheck"
        ></Input>
        <ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
        <Label for="phone_number">휴대전화</Label>
        <Input
          error={errors.phoneCheck?.message}
          {...register('phone_number', {
            required: '휴대전화 번호를 입력해 주세요',
            pattern: phonePattern,
          })}
          placeholder="휴대전화 번호를 입력하세요"
          id="phone_number"
        ></Input>
        <ErrorMessage>{errors.phone_number?.message}</ErrorMessage>
        <Label for="address">주소</Label>
        <AddressDiv>
          {visible ? (
            <div>
              <CloseBtn onClick={() => setVisible(false)}>닫기</CloseBtn>
              <DaumPostcode
                onComplete={handleComplete}
                onSuccess={test}
                style={addressStyle}
                height={700}
              />
            </div>
          ) : null}

          {writeInfo.address === '' ? (
            <AddressInputDiv onClick={() => setVisible(true)} placeholder="주소를 검색 해주세요">
              주소를 검색 해주세요
            </AddressInputDiv>
          ) : (
            <AddressInputDiv onClick={() => setVisible(true)}>{writeInfo.address}</AddressInputDiv>
          )}
        </AddressDiv>
        <Button type="submit">가입신청</Button>
      </Form>
    </Container>
  );
};

export default Signup;
