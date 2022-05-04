import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Navbar from './components/NavBar';
import LoginModal from './components/Modal/LoginModal';
import GlobalStyle from './styled/Globalstyles';
import OAuth2RedirectHandler from './pages/oauthLogin';
import WriteModal from './components/Modal/WriteModal/WriteModal';
import MyPageModal from './components/Modal/MyPageModal';
import MyPage from './pages/MyPage';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <Navbar />
      <LoginModal />
      <WriteModal />
      <MyPageModal />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/oauth/kakao" element={<OAuth2RedirectHandler />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
