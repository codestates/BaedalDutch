import React from 'react';
import styled, { keyframes } from 'styled-components';
import testImg from '../../assets/Landing2.gif';
import { Slide, Zoom } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

function Landing2() {
  const navigate = useNavigate();
  const handleMain = () => {
    navigate('/main');
  };
  return (
    <div>
      <Wrapper>
        <TextDiv>
          <Zoom triggerOnce={false} duration={1500}>
            <Text>
              <Baedal>BaedalDutch</Baedal>는 부담되는 배달비를 더치페이하는 플랫폼입니다.{' '}
            </Text>
            <Text>지금 지도에서 내 위치를 확인하고 먹고 싶은 메뉴를 골라</Text>
            <Text>음식을 주문해 배달비를 절약해 보세요!</Text>
          </Zoom>
          <GoButton onClick={handleMain}>바로시작</GoButton>
        </TextDiv>
        {/* <Div> */}
        <ImageDiv>
          <Slide triggerOnce={false} direction={'right'} duration={1500}>
            <ChattImage src={testImg} alt="banner" />
          </Slide>
        </ImageDiv>
        {/* </Div> */}
      </Wrapper>
    </div>
  );
}

export default Landing2;

const slideUp = keyframes`
  0% {
      transform: translateX(0%);
  }
  10% {
      transform: translateX(10%);
      transform: translateY(10%);
  }
  20% {
      transform: translateX(20%);
      transform: translateY(20%);
  }
  50% {
      transform: translateX(50%);
     
  }
  75% {
      transform: translateX(75%);
    
  }
  100% {
      transform: translateX(100%);
      
  }
`;

export const Wrapper = styled.div`
  background-color: rgba(255, 218, 102);
  /* border-bottom: 1px solid; */
  padding-top: 75px;
  height: 70vh;
  padding: 0 20px;
  align-items: center;
  display: flex;
  @media (max-width: 710px) {
    display: block;
  }
  @media (max-width: 576px) {
    display: block;
  }
  @media (max-width: 400px) {
    display: block;
  }
`;

export const TextDiv = styled.div`
  margin-left: 8%;
  @media (max-width: 710px) {
    margin-left: -100px;
  }
  @media (max-width: 576px) {
    margin-left: 17%;
  }
  @media (max-width: 400px) {
    margin-left: 14%;
  }
`;

export const Text = styled.div`
  color: black;
  font-size: 40px;
  font-weight: 300;
  margin-bottom: 5px;
  @media (max-width: 710px) {
    font-size: 3rem;
  }
  @media (max-width: 576px) {
    font-size: 1.7rem;
    padding-top: 10px;
  }
  @media (max-width: 400px) {
    font-size: 1.7rem;
    padding-top: 10px;
  }
`;

export const ImageDiv = styled.div`
  @media (max-width: 710px) {
  }
  @media (max-width: 576px) {
  }
  @media (max-width: 400px) {
  }
`;

export const ChattImage = styled.img`
  margin-left: 180px;
  @media (max-width: 1100px) {
    margin-left: 10px;
  }
  @media (max-width: 770px) {
    margin-left: 10px;
    display: block;
  }
  @media (max-width: 576px) {
    margin-left: 2px;
    display: block;
  }
  @media (max-width: 400px) {
    margin-left: 7px;
    width: 85vw;
  }
`;

export const FoodImgDiv = styled.div`
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
`;

export const Img = styled.img`
  position: relative;
`;

export const Div = styled.div``;

export const GoButton = styled.button`
  margin-top: 50px;
  width: 200px;
  height: 80px;
  font-size: 30px;
  font-weight: 500;
  border-radius: 50px;
  //background-color: #7C0811;
  background-color: white;
  color: black;
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
  cursor: pointer;
`;

const Baedal = styled.span`
  color: blue;
`;
