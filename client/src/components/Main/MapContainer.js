import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { saveSearchListAction } from '../../store/search';

const { kakao } = window;

const TopContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const MapContainer = () => {
  const dispatch = useDispatch();
  const searchPlace = useSelector((state) => state.search?.defaultInput);

  const myMap = useRef(null);
  useEffect(() => {
    const container = myMap.current;
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();
    console.log('장소에러', searchPlace);
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB);
      function placesSearchCB(data, status) {
        console.log('정보확인', data);
        dispatch(saveSearchListAction(data));
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      }
    }

    // function displayMarker(place) {
    //   console.log('궁금', place);
    //   let marker = new kakao.maps.Marker({
    //     map: map,
    //     position: new kakao.maps.LatLng(place.y, place.x),
    //   });
    //   // 마커에 클릭이벤트를 등록합니다
    //   kakao.maps.event.addListener(marker, 'click', function () {
    //     // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    //     infowindow.setContent(
    //       '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>',
    //     );
    //     infowindow.open(map, marker);
    //   });
    // }
  }, [searchPlace]);
  return <TopContainer ref={myMap} />;
};
export default MapContainer;