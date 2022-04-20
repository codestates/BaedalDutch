import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import styled from "styled-components"
import Signup from "./pages/Signup"
import Main from "./pages/Main"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
