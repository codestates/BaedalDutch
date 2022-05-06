import styled from 'styled-components';
import dutch1 from '../assets/dutch.jpeg';
import dutch2 from '../assets/dutch2.jpeg';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid green;
`;
const Introduce1 = styled.img``;
const Introduce2 = styled.img``;
const Introduce3 = styled.img``;

function Landing() {
  return (
    <>
      <Container>
        <Introduce1 src={dutch1}></Introduce1>
        <Introduce2 src={dutch2}></Introduce2>
        <Introduce3></Introduce3>
      </Container>
    </>
  );
}

export default Landing;
