import Landing2 from '../components/Landing/Landing2';
import Landing1 from '../components/Landing/Landing1';
import Footer from '../components/Landing/Footer';

// const Container = styled.div`
//   display: flex;
//   width: 100%;
//   flex-direction: column;
//   justify-content: space-around;
//   border: 1px solid green;
// `;
// const Introduce1 = styled.img``;
// const Introduce2 = styled.img``;
// const Introduce3 = styled.img``;

function Landing() {
  return (
    <>
      <Landing1 />
      <Landing2 />
      <Footer />
    </>
  );
}

export default Landing;
