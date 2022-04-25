import React from 'react';
import Signin from '../../pages/Signin';
import { useSelector, useDispatch } from 'react-redux';
import { showModalAction } from '../../store/modal';
import { CloseButton, Icon, ModalBackdrop, ModalContainer, ModalView } from '../../styled/modal';

const LoginModal = () => {
  const showModal = useSelector((state) => state.modal.showModal);
  const dispatch = useDispatch();

  console.log('snowmodal상태', showModal);

  return (
    <ModalContainer showModal={showModal}>
      <ModalBackdrop>
        <ModalView>
          <CloseButton onClick={() => dispatch(showModalAction(false))}>
            <Icon className="fa-solid fa-xmark"></Icon>
          </CloseButton>
          <Signin />
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
};

export default LoginModal;
