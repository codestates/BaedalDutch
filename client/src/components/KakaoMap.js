import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const MapContainer = styled.div`
  position: relative;
  width: 1400px;
  height: 900px;
`;

const KakaoMap = ({ searchPlace }) => {
  const place = useRef(null);

  useEffect(() => {
    const container = place.current;
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };
    let map = new kakao.maps.Map(container, mapOption);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let locPosition = new kakao.maps.LatLng(lat, lon); //좌표 (위도+경도)
        let message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });
    } else {
      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667); //위치 나중에 서울 중심으로 바꾸기
      let message = '위치정보를 켜주세요';

      displayMarker(locPosition, message);
    }
    //마커생성
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
  }, []);

  return <MapContainer ref={place} />;
};

export default KakaoMap;
