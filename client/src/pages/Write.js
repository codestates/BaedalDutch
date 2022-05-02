import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';
import { DaumPostcode } from 'react-daum-postcode';
import KaKaoAdress from '../components/KakaoAdress';

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
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StoreNameInput = styled.input``;

const AddressLink = styled.link``;

const SelectContainer = styled.div``;

const CategorySelect = styled.select``;

const MemberNumSelect = styled.select``;

const FeeInput = styled.input``;

const PhoneInput = styled.input``;

const ContentArea = styled.textarea``;

const ErrorMessage = styled.div``;

const WriteButton = styled.button``;

const Write = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = () => {
    const { store_name, food_category, member_num, content, fee, address } = getValues();
    console.log(store_name, food_category, member_num, content, fee, address);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/parties`,
        {
          store_name,
          food_category,
          member_num,
          content,
          fee,
          address,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      .then((res) => {
        // setWriteModal(false);
      });
  };

  //   const handleChange = (e) => {
  //     console.log(e.target.value);}

  const feePattern = {
    value: /^[|0-9|]+$/,
    message: '숫자만 입력해주세요',
  };

  const phonePattern = {
    value: /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
    message: '휴대전화 번호를 입력해 주세요',
  };

  const onComplete = (data) => {
    console.log(data);
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
          <CategorySelect></CategorySelect>
          <MemberNumSelect></MemberNumSelect>
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
        <KaKaoAdress />
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

        <WriteButton type="submit">가입신청</WriteButton>
      </WriteForm>
    </WriteContainer>
  );
};

export default Write;
