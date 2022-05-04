import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.showModal ? 'block' : 'none')};
  z-index: 999;
  position: relative;
`;
export const WriteModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.showWriteModal ? 'block' : 'none')};
  z-index: 999;
  position: relative;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  z-index: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  margin: 0;
  border: 10px solid black;
`;

export const WriteModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  z-index: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  bottom: 100px;
  @media screen and (max-width: 700px) {
    display: flex;
    justify-content: center;
    align-items: center;
    left: 100px;
    bottom: 150px;
  }
`;

export const ModalView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 360px;
  background-color: white;
  border-radius: 10px;
  height: 432px;
`;

export const WriteModalView = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  top: 200px;
  right: 100px;
  align-items: center;
  flex-direction: column;
  width: 400px;
  background-color: white;
  border-radius: 10px;
  height: 600px;
  border: 5px solid black;
`;

export const CloseButton = styled.div`
  font-size: 15px;
  justify-content: flex-end;
  display: flex;
  width: 100%;
  cursor: pointer;
  z-index: 99;
`;

export const WriteCloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 99;
`;

export const Icon = styled.i`
  margin: 10px;
  padding: 10px;
`;
