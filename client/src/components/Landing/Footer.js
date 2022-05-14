// import { FaGithub } from 'react-icons/fa';
// import { SiNotion } from 'react-icons/si';
import github from '../../assets/깃허브 이미지.png';
import notion from '../../assets/노션 이미지.png';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  background-color: #dddddd;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 500;
  padding-bottom: 20px;
`;

const IconContainer = styled.div`
  > a {
    &:first-child {
      margin-right: 10px;
    }
  }
`;

const ContentContainer = styled.div`
  padding: 40px 0;
  display: flex;
`;

const Content = styled.div`
  text-align: center;
  &:not(:last-child) {
    padding-right: 40px;
  }
`;

const MemberName = styled.div`
  padding-bottom: 10px;
`;

const MemberPoition = styled.div`
  padding-bottom: 10px;

  font-size: 12px;
`;

const MemberGithub = styled.div`
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const Comment = styled.div`
  color: #a2a2a2;
  font-size: 10px;
`;

const Img = styled.img`
  width: 50px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Title>About Us</Title>
      <IconContainer>
        <a
          href="https://github.com/codestates/BaedalDutch"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Img src={github} />
        </a>
        <a
          href="https://www.notion.so/6-75840231ecb14fa7a60e13f9aaf93ffc"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Img src={notion} />
        </a>
      </IconContainer>
      <ContentContainer>
        <Content>
          <MemberName>이 성 혁</MemberName>
          <MemberPoition>Front-End</MemberPoition>
          <a href="https://github.com/bladezerocd" target="_blank" rel="noreferrer noopener">
            <MemberGithub>GitHub</MemberGithub>
          </a>
        </Content>
        <Content>
          <MemberName>김 정 욱</MemberName>
          <MemberPoition>Back-End</MemberPoition>
          <a href="https://github.com/jungukuk" target="_blank" rel="noreferrer noopener">
            <MemberGithub>GitHub</MemberGithub>
          </a>
        </Content>
        <Content>
          <MemberName>엄 태 영</MemberName>
          <MemberPoition>Back-End</MemberPoition>
          <a href="https://github.com/xodud3008" target="_blank" rel="noreferrer noopener">
            <MemberGithub>GitHub</MemberGithub>
          </a>
        </Content>
        <Content>
          <MemberName>이 승 호</MemberName>
          <MemberPoition>Back-End</MemberPoition>
          <a href="https://github.com/leo-labbb" target="_blank" rel="noreferrer noopener">
            <MemberGithub>GitHub</MemberGithub>
          </a>
        </Content>
      </ContentContainer>
      <Comment>Copyright @ 2022 BaedalDutch</Comment>
    </FooterContainer>
  );
};

export default Footer;
