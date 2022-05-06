import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showWriteAction } from '../../../store/modal';
import {
  WriteCloseButton,
  Icon,
  WriteModalBackdrop,
  WriteModalContainer,
  WriteModalView,
} from '../../../styled/modal';
import Write from '../../../pages/Write';

const WriteModal = () => {
  const showWriteModal = useSelector((state) => state.modal.showWriteModal);
  const dispatch = useDispatch();

  return (
    <WriteModalContainer showWriteModal={showWriteModal}>
      <WriteModalBackdrop>
        <WriteModalView>
          <WriteCloseButton
            onClick={() => {
              dispatch(showWriteAction(false));
            }}
          >
            <Icon className="fa-solid fa-xmark"></Icon>
          </WriteCloseButton>
          <Write />
        </WriteModalView>
      </WriteModalBackdrop>
    </WriteModalContainer>
  );
};

export default WriteModal;
