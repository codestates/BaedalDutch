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
  const currentLat = useSelector((state) => state.location.lat);
  const currentLng = useSelector((state) => state.location.lng);
  console.log('확인', currentLat);
  console.log('확인2', currentLng);

  const myMap = useRef(null);
  useEffect(() => {
    const container = myMap.current;
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let locPosition = new kakao.maps.LatLng(lat, lon); //좌표 (위도+경도)
        let message = '<div style="padding:5px;">당신의 위치</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667); //위치 나중에 서울 중심으로 바꾸기
      let message = '위치정보를 켜주세요';

      displayMarker(locPosition, message);
    }

    function displayMarker(locPosition, message) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      let iwContent = message; // 인포윈도우에 표시할 내용
      let iwPosition = new kakao.maps.LatLng(locPosition);

      // 인포윈도우를 생성합니다
      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        position: iwPosition,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);

      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        var latlng = mouseEvent.latLng;
        marker.setPosition(latlng);
        infowindow.setPosition(latlng);
      });
    }

    const ps = new kakao.maps.services.Places();

    console.log('장소에러', searchPlace);
    let bounds = new kakao.maps.LatLngBounds();
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB, {
        radius: 2000,
        location: new kakao.maps.LatLng(currentLat, currentLng),
      });
      function placesSearchCB(data, status) {
        console.log('정보확인', data);
        dispatch(saveSearchListAction(data));
        if (status === kakao.maps.services.Status.OK) {
          for (let i = 0; i < data.length; i++) {
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      }
    }
  }, [searchPlace]);
  console.log('재랜더링?');

  return <TopContainer ref={myMap} />;
};
export default MapContainer;
