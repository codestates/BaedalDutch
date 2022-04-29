import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showWriteAction } from '../../store/modal';
import {
  CloseButton,
  Icon,
  WriteModalBackdrop,
  WriteModalContainer,
  ModalView,
} from '../../styled/modal';
import Write from '../../pages/Write';

const WriteModal = () => {
  const showWriteModal = useSelector((state) => state.modal.showWriteModal);
  const dispatch = useDispatch();

  console.log('snowmodal상태', showWriteModal);

  return (
    <WriteModalContainer showWriteModal={showWriteModal}>
      <WriteModalBackdrop>
        <ModalView>
          <CloseButton
            onClick={() => {
              dispatch(showWriteAction(false));
            }}
          >
            <Icon className="fa-solid fa-xmark"></Icon>
          </CloseButton>
          <Write />
        </ModalView>
      </WriteModalBackdrop>
    </WriteModalContainer>
  );
};

export default WriteModal;
