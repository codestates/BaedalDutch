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
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border: 10px solid black;
`;

export const WriteModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  z-index: 1;
  justify-content: right;
  align-items: right;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border: 10px solid black;
`;

export const ModalView = styled.div`
  display: flex;
  position: fixed;
  top: 200px;
  right: 50px;
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
export const Icon = styled.i`
  margin: 10px;
  padding: 10px;
`;
