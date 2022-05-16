import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components/macro';
import Lan1 from '../../assets/Landing2.gif';

const Landing1 = () => {
  const navigate = useNavigate();
  const handleMain = () => {
    navigate('/main');
  };
  return (
    <AboutSection className="flex-center-C">
      <Main>
        <Content>
          <AboutText>
            <Title>
              <Baedal>BaedalDutch</Baedal> 는 부담되는 배달비를 더치페이하는 플랫폼입니다
            </Title>
            <SubText>지금 지도에서 내 위치를 확인하고</SubText>
            <SubText>먹고 싶은 메뉴를 골라</SubText>
            <SubText>음식을 주문해 배달비를 절약해 보세요!</SubText>
            <Rectangle6>
              <Text onClick={handleMain}>시작하기</Text>
            </Rectangle6>
          </AboutText>

          <Rocket>
            <img src={Lan1} alt="" />
          </Rocket>
        </Content>
      </Main>
    </AboutSection>
  );
};

//애니메이션 무빙
const move = keyframes`
0% { transform: translateY(-5px)  }
    50% { transform: translateY(10px) }
    100% { transform: translateY(-5px) }
`;

const AboutSection = styled.section`
  border: 1px solid #ffeaa0;
  width: 100%;
  height: 1100px;
  padding-left: 10px;

  background-color: #ffeaa0; ;
`;

const Main = styled.div`
  margin: 15rem;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 35px;
  line-height: 1.5;
  padding: 1rem 0;
  color: black;
  width: 110%;
  word-break: keep-all;
`;

const Rectangle6 = styled.div`
  margin-top: 30px;
  border-radius: 50px;
  height: 53px;
  width: 148px;
  padding: 11px;
  background-color: white;
  cursor: pointer;
`;
const Text = styled.div`
  text-align: center;
  vertical-align: top;
  font-size: 24px;
  color: black;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1300px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Rocket = styled.div`
  display: flex;
  width: 50%;
  padding-bottom: 5rem;
  animation: ${move} 2.5s ease infinite;
  max-width: 100%;
  height: auto;

  & img {
    width: 100%;
    max-width: 100%;
    height: auto;
    min-width: 200px;
  }
  @media screen and (max-width: 1300px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 500px;
  }
`;
const SubText = styled.h5`
  font-size: 30px;
  line-height: 1.5;

  color: black;
  width: 100%;
  word-break: keep-all;
`;

const AboutText = styled.div`
  width: 50%;
  position: relative;
  margin-bottom: 50px;
  width: 500px;
`;

const Baedal = styled.span`
  font-style: italic;
  font-size: 40px;
  color: #009900;
`;

export default Landing1;
