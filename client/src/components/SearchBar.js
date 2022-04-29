import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { inputAction } from '../store/input';

const { kakao } = window;

const InputForm = styled.form`
  position: absolute;
  z-index: 999;
  top: 150px;
  left: 30px;
`;

const Input = styled.input`
  font-size: 30px;
  border: none;
  background-color: white;
  border-radius: 15px;
  outline: none;
`;

const InputButton = styled.button`
  font-size: 28px;
  border: none;
  background-color: white;
`;

const SearchBar = () => {
  const [InputText, setInputText] = useState('');
  const dispatch = useDispatch();

  const changeSearchText = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(inputAction(InputText));
    setInputText('');
  };

  console.log('gkdl', InputText);

  return (
    <>
      <InputForm onSubmit={handleSubmit}>
        <Input placeholder="검색어를 입력하세요" onChange={changeSearchText} value={InputText} />
        <InputButton type="submit">검색</InputButton>
      </InputForm>
    </>
  );
};

export default SearchBar;
