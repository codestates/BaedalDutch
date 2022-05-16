import React from 'react';
import styled, { keyframes } from 'styled-components';
import dutch from '../../assets/dutch.jpeg';
import { Zoom } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

function Landing1() {
  const navigate = useNavigate();

  const handleMain = () => {
    navigate('/main');
  };

  return (
    <div>
      <Div>
        <Wrapper>
          <TextDiv>
            <Zoom triggerOnce={false} duration={1500}>
              <Text data-text="음식값보다 비싼 배달비 ! ">비싸지는 배달비hihihihihihihihihi</Text>
              <Text>함께 나눠봐요</Text>
              <Text>BaedalDutch</Text>
            </Zoom>
            <GoButton onClick={handleMain}>바로시작</GoButton>
          </TextDiv>
        </Wrapper>
      </Div>
    </div>
  );
}

export default Landing1;

export const Div = styled.div`
  width: 100vw;
  height: 100%;
  background-image: url(${dutch});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  @media (max-width: 710px) {
    background-size: cover;
  }
  @media (max-width: 576px) {
    background-size: cover;
  }
  @media (max-width: 400px) {
    background-size: cover;
  }
`;

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.41);
  border-bottom: 1px solid;
  padding-top: 75px;
  height: 100vh;
  padding: 0 20px;
  align-items: center;
  display: flex;
`;

export const TextDiv = styled.div`
  margin-left: 20%;
  @media (max-width: 710px) {
    margin-left: 13%;
  }
  @media (max-width: 576px) {
    margin-left: 13%;
  }
  @media (max-width: 400px) {
    margin-left: 13%;
  }
`;

export const Text = styled.div`
  color: #ffffff;
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 5px;
  position: relative;
  @media (max-width: 710px) {
    font-size: 3rem;
  }
  @media (max-width: 576px) {
    font-size: 1.7rem;
  }
  @media (max-width: 400px) {
    font-size: 1.7rem;
  }
`;

export const GoButton = styled.button`
  margin-top: 20px;
  width: 180px;
  height: 60px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 50px;
  //background-color: #7C0811;
  background-color: #d9c6ac;
  color: #7a5728;
  //7C0811  B51D29
  //color: #D9C6AC;
  border: 0;
  @media (max-width: 710px) {
    margin-top: 15%;
    margin-left: 37px;
  }
  @media (max-width: 576px) {
    margin-left: 37px;
    margin-top: 15%;
  }
  @media (max-width: 400px) {
    margin-left: 37px;
    margin-top: 15%;
  }
`;
