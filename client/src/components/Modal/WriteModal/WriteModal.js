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

const { kakao } = window;

const WriteModal = () => {
  const showWriteModal = useSelector((state) => state.modal.showWriteModal);
  const dispatch = useDispatch();

  const imgSrc = '../../../../public/icon';
  const imgSize = new kakao.map.Size(64, 69);
  const imgOption = { offset: new kakao.maps.Point(27, 69) };
  const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption),
    markerPosition = new kakao.maps.LatLng(37.54699, 127.09598);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
  });
  marker.setMap(map);

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
