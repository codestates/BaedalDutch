import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { food, dutchPerson } from '../components/SelectorList';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import Select from 'react-select';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showWriteAction } from '../store/modal';
import { currentLocationAction } from '../store/location';

const { kakao } = window;

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const WriteTitle = styled.div`
  text-align: center;
  font-size: 30px; ;
`;

const WriteForm = styled.form`
  margin-top: 10px;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StoreNameInput = styled.input`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  width: 295px;
  height: 80px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 18px;
  border: solid 1px #c4c4c4;
  border-radius: 6px;
  padding-left: 5px;
  &:focus {
    outline: 1.5px solid #1c84fa;
  }
`;

const AddressLink = styled.link``;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CategorySelect = styled(Select)`
  width: 145px;
  padding-left: 9px;
  margin-top: 15px;
`;

const MemberNumSelect = styled(Select)`
  width: 145px;
  padding-right: 9px;
  margin-top: 15px;
`;

const FeeInput = styled.input`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  width: 295px;
  height: 80px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 18px;
  border: solid 1px #c4c4c4;
  border-radius: 6px;
  padding-left: 5px;
  &:focus {
    outline: 1.5px solid #1c84fa;
  }
`;

const PhoneInput = styled.input`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  width: 295px;
  height: 80px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 18px;
  border: solid 1px #c4c4c4;
  border-radius: 6px;
  padding-left: 5px;
  &:focus {
    outline: 1.5px solid #1c84fa;
  }
`;

const ContentArea = styled.textarea`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  width: 295px;
  height: 150px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 18px;
  border: solid 1px #c4c4c4;
  border-radius: 6px;
  padding-left: 5px;
  &:focus {
    outline: 1.5px solid #1c84fa;
  }
`;

const ErrorMessage = styled.div``;

const WriteButton = styled.button`
  margin: 8px;
  padding: 10px;
  border: white;
  background-color: #cce8f4;
  border-radius: 6px;
`;

const AdressDiv = styled.div`
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
  background-color: white;
  display: flex;
  align-items: center;
  color: rgb(114, 114, 114);
  width: 295px;
  height: 50px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 18px;
  padding-top: 1px;
  padding-left: 5px;
  border: solid 1px #c4c4c4;
  border-radius: 6px;
  &:hover {
    cursor: pointer;
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

const Write = () => {
  const dispatch = useDispatch();

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
  const [visible, setVisible] = useState(false);

  const handleSelectPerson = (e) => {
    setWriteInfo({ ...writeInfo, member_num: e.value });
  };

  const handleSelectMenu = (e) => {
    setWriteInfo({ ...writeInfo, food_category: e.value });
  };

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
    setVisible(false);
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
    console.log('제출할때', writeInfo);
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      console.log('상태?', status);
      if (status === 'OK') {
        const newAddSearch = result[0];
        console.log(newAddSearch);
        setWriteInfo({ ...writeInfo, lat: newAddSearch.y, lng: newAddSearch.x });
      }
      console.log('writeInfo.lat', typeof writeInfo.lat);
    };
    geocoder.addressSearch(`${writeInfo.address}`, callback);
  };

  if (writeInfo.lat !== '') {
    dispatch(currentLocationAction({ lat: writeInfo.lat, lng: writeInfo.lng }));
    const { store_name, content, fee } = getValues();

    console.log('axios요청', writeInfo.food_category);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/parties`,
        {
          store_name,
          food_category: writeInfo.food_category,
          member_num: writeInfo.member_num,
          content,
          fee,
          address: writeInfo.address,
          lat: writeInfo.lat,
          lng: writeInfo.lng,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(writeInfo);
        dispatch(showWriteAction(false));
      });
  }

  const feePattern = {
    value: /^[|0-9|]+$/,
    message: '숫자만 입력해주세요',
  };

  const phonePattern = {
    value: /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
    message: '휴대전화 번호를 입력해 주세요',
  };

  return (
    <WriteContainer>
      <WriteForm onSubmit={handleSubmit(onSubmit)}>
        <WriteTitle>파티 모집</WriteTitle>
        <StoreNameInput
          error={errors.store_name?.message}
          {...register('store_name', {
            required: '올바른 식당 이름을 입력하세요',
            minLength: { value: 1, message: '최소 1 글자 이상을 입력해 주세요' },
          })}
          placeholder="식당이름"
          id="store_name"
        />
        <AddressLink></AddressLink>
        <ErrorMessage>{errors.store_name?.message}</ErrorMessage>
        <SelectContainer>
          <CategorySelect
            placeholder={'메뉴'}
            options={food}
            onChange={(e) => handleSelectMenu(e)}
          />
          <MemberNumSelect
            placeholder={'모집인원'}
            options={dutchPerson}
            onChange={(e) => handleSelectPerson(e)}
          />
        </SelectContainer>
        <FeeInput
          error={errors.fee?.message}
          {...register('fee', {
            required: '숫자만 적어 주세요',
            pattern: feePattern,
          })}
          placeholder="배달비"
          id="fee"
        />
        <ErrorMessage>{errors.fee?.message}</ErrorMessage>
        <AdressDiv>
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
            <AddressInputDiv onClick={() => setVisible(true)}>주소를 검색 해주세요</AddressInputDiv>
          ) : (
            <AddressInputDiv onClick={() => setVisible(true)}>{writeInfo.address}</AddressInputDiv>
          )}
        </AdressDiv>
        <PhoneInput
          error={errors.member_num?.message}
          {...register('member_num', {
            required: '휴대전화 번호를 입력해 주세요',
            pattern: phonePattern,
          })}
          placeholder="휴대전화 번호를 입력하세요"
          id="member_num"
        ></PhoneInput>
        <ErrorMessage>{errors.member_num?.message}</ErrorMessage>

        <ContentArea
          error={errors.content?.message}
          {...register('content', {
            required: '내용을 간단하게 적어주세요',
            minLength: { value: 1, message: '최소 1 글자 이상을 입력해 주세요' },
          })}
          placeholder="세부사항을 입력하세요"
          id="content"
        ></ContentArea>

        <WriteButton type="submit" onClick={() => dispatch(showWriteAction(false))}>
          가입신청
        </WriteButton>
      </WriteForm>
    </WriteContainer>
  );
};
export default Write;
