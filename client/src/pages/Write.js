import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { food, dutchPerson } from '../components/SelectorList';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showWriteAction } from '../store/modal';
import { currentLocationAction } from '../store/location';
import io from 'socket.io-client';

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
  cursor: pointer;
`;

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

let socket;

const Write = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login.loginUser);
  const partyData = useSelector((state) => state.visible.partyData);

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

  useEffect(() => {
    socket = io.connect(`${process.env.REACT_APP_API_URL}`, {
      transports: ['websocket', 'polling'],
    });
    let nickname = loginUser.nickname;

    test();
    socket.emit('joinServer', { nickname });

    return () => {
      socket.off();
    };
  }, [visible, writeInfo.address]);

  const handleSelectPerson = (e) => {
    setWriteInfo({ ...writeInfo, member_num: e.value });
  };

  const handleSelectMenu = (e) => {
    setWriteInfo({ ...writeInfo, food_category: e.value });
  };

  const handleComplete = (data) => {
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
    setVisible(false);
  };

  const test = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      if (status === 'OK') {
        const newAddSearch = result[0];
        setWriteInfo({ ...writeInfo, lat: newAddSearch.y, lng: newAddSearch.x });
      }
    };
    geocoder.addressSearch(`${writeInfo.address}`, callback);
  };

  const onSubmit = () => {
    if (writeInfo.lat !== '') {
      dispatch(currentLocationAction({ lat: writeInfo.lat, lng: writeInfo.lng }));
      const { store_name, content, fee } = getValues();

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
        .then(async (data) => {
          dispatch(showWriteAction(false));
          if (data.status === 201) {
            let id = await data.data.data.id;
            let roomName = await data.data.data.store_name;
            let nickname = await loginUser.nickname;
            let categoryFood = await data.data.data.food_category;

            socket.emit('createRoom', { id, nickname, roomName, categoryFood });
            window.location.replace('/main');
          }
        })
    }  
  };

  const feePattern = {
    value: /^[|0-9|]+$/,
    message: '????????? ??????????????????',
  };

  const phonePattern = {
    value: /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
    message: '???????????? ????????? ????????? ?????????',
  };

  return (
    <WriteContainer>
      <WriteForm onSubmit={handleSubmit(onSubmit)}>
        <WriteTitle>?????? ??????</WriteTitle>
        <StoreNameInput
          error={errors.store_name?.message}
          {...register('store_name', {
            required: '????????? ?????? ????????? ???????????????',
            minLength: { value: 1, message: '?????? 1 ?????? ????????? ????????? ?????????' },
          })}
          placeholder="????????????"
          id="store_name"
        />
        <AddressLink></AddressLink>
        <ErrorMessage>{errors.store_name?.message}</ErrorMessage>
        <SelectContainer>
          <CategorySelect
            placeholder={'??????'}
            options={food}
            onChange={(e) => handleSelectMenu(e)}
          />
          <MemberNumSelect
            placeholder={'????????????'}
            options={dutchPerson}
            onChange={(e) => handleSelectPerson(e)}
          />
        </SelectContainer>
        <FeeInput
          error={errors.fee?.message}
          {...register('fee', {
            required: '????????? ?????? ?????????',
            pattern: feePattern,
          })}
          placeholder="?????????"
          id="fee"
        />
        <ErrorMessage>{errors.fee?.message}</ErrorMessage>
        <AddressDiv>
          {visible ? (
            <div>
              <CloseBtn onClick={() => setVisible(false)}>??????</CloseBtn>
              <DaumPostcode
                onComplete={handleComplete}
                onSuccess={test}
                style={addressStyle}
                height={700}
              />
            </div>
          ) : null}

          {writeInfo.address === '' ? (
            <AddressInputDiv onClick={() => setVisible(true)}>????????? ?????? ????????????</AddressInputDiv>
          ) : (
            <AddressInputDiv onClick={() => setVisible(true)}>{writeInfo.address}</AddressInputDiv>
          )}
        </AddressDiv>
        <PhoneInput
          error={errors.member_num?.message}
          {...register('member_num', {
            required: '???????????? ????????? ????????? ?????????',
            pattern: phonePattern,
          })}
          placeholder="???????????? ????????? ???????????????"
          id="member_num"
        ></PhoneInput>
        <ErrorMessage>{errors.member_num?.message}</ErrorMessage>

        <ContentArea
          error={errors.content?.message}
          {...register('content', {
            required: '????????? ???????????? ???????????????',
            minLength: { value: 1, message: '?????? 1 ?????? ????????? ????????? ?????????' },
          })}
          placeholder="??????????????? ???????????????"
          id="content"
        ></ContentArea>

        <WriteButton type="submit" onClick={() => onSubmit}>
          ?????? ?????????
        </WriteButton>
      </WriteForm>
    </WriteContainer>
  );
};
export default Write;
