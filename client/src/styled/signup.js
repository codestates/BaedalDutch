import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  align-items: center;
  justify-content: center;
  border: 1px solid green;
  width: 100%;
  height: 100vh;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 360px;
  width: 100%;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Input = styled.input`
  display: flex;
  text-align: center;
  justify-content: center;
  margin: 20px;
  width: 100%;
  border: none;
  text-decoration: none;
  border-bottom: ${(props) => (props.error ? '2px solid red' : '2px solid rgba(0, 0, 0, 0.2)')};
  &:focus {
    outline: none;
  }
`;
export const Button = styled.button`
  border: none;
  font-weight: bold;
  font-size: 20px;
  background-color: yellow;
  padding: 8px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px; ;
`;
