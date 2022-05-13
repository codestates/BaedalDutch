import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { inputAction } from '../../store/search';

const { kakao } = window;

const Container = styled.div`
  position: absolute;
  z-index: 300;
  top: 150px;
  left: 30px;
  display: flex;
  flex-direction: column;
`;

const InputForm = styled.form`
  position: relative;
`;

const Input = styled.input`
  font-size: 30px;
  border: none;
  background-color: white;
  border-radius: 15px;
  outline: none;
`;

const InputButton = styled.button`
  position: absolute;
  left: 265px;
  font-size: 28px;
  border: none;
  background-color: white;
  cursor: pointer;
`;
const PlaceList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const PlaceName = styled.div`
  opacity: 80%;
  border-bottom: 1px solid grey;
  background-color: white;
  padding: 10px;
  font-weight: bold;
`;

const PlaceAddress = styled.div`
  opacity: 80%;
  border-bottom: 1px solid grey;
  background-color: white;
  padding: 10px;
`;

const SearchBar = () => {
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.search?.searchList);
  console.log('장소확인', searchList);

  const changeSearchText = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('검색');
    e.preventDefault();
    dispatch(inputAction(inputText));
    setInputText('');
    console.log(inputText);
  };

  return (
    <Container>
      <InputForm onSubmit={handleSubmit}>
        <Input placeholder="검색어를 입력하세요" onChange={changeSearchText} value={inputText} />
        <InputButton
          onClick={() => {
            setIsOpen(true);
          }}
          type="submit"
        >
          <i class="fa-solid fa-magnifying-glass-location"></i>
        </InputButton>
        {isOpen ? (
          <PlaceList>
            {searchList.map((search) => {
              console.log(search.place_name);

              return (
                <>
                  <PlaceName
                    onClick={() => {
                      dispatch(inputAction(search.place_name));
                      setIsOpen(false);
                    }}
                  >
                    {search.place_name}
                  </PlaceName>
                  <PlaceAddress>ㄴ{search.address_name}</PlaceAddress>
                </>
              );
            })}
          </PlaceList>
        ) : null}
      </InputForm>
    </Container>
  );
};

export default SearchBar;
