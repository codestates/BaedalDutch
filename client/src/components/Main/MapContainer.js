import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { saveSearchListAction } from '../../store/search';

const { kakao } = window;

const TopContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const MapContainer = () => {
  const dispatch = useDispatch();
  const partyData = useSelector((state) => state.partyData.parties);
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
      center: new kakao.maps.LatLng(37.39458178795827, 127.11142904893866),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);
    
    

    const positions = partyData.map((party, i) => {
      return {
        title: party.store_name,
        food_category: party.food_category,
        latlng: new kakao.maps.LatLng(party.lat, party.lng),
      };
    });

    console.log('카테고리나오게', positions.food_category);

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(50, 50);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        `icon/${positions[i].food_category}.png`,
        imageSize,
      );

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
        clickable: true,
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     let lat = position.coords.latitude;
    //     let lon = position.coords.longitude;

    //     let locPosition = new kakao.maps.LatLng(lat, lon); //좌표 (위도+경도)
    //     let message = '<div style="padding:5px;">당신의 위치</div>'; // 인포윈도우에 표시될 내용입니다

      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        alert('하이');
      });
    }
    //     // 마커와 인포윈도우를 표시합니다
    //     displayMarker(locPosition, message);
    //   });
    // } else {
    //   let locPosition = new kakao.maps.LatLng(33.450701, 126.570667); //위치 나중에 서울 중심으로 바꾸기
    //   let message = '위치정보를 켜주세요';

    //   displayMarker(locPosition, message);
    // }

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     let lat = position.coords.latitude;
    //     let lon = position.coords.longitude;

    //     let locPosition = new kakao.maps.LatLng(lat, lon); //좌표 (위도+경도)
    //     let message = '<div style="padding:5px;">당신의 위치</div>'; // 인포윈도우에 표시될 내용입니다

    //     // 마커와 인포윈도우를 표시합니다
    //     displayMarker(locPosition, message);
    //   });
    // } else {
    //   let locPosition = new kakao.maps.LatLng(33.450701, 126.570667); //위치 나중에 서울 중심으로 바꾸기
    //   let message = '위치정보를 켜주세요';

    //   displayMarker(locPosition, message);
    // }

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
      // map.setCenter(locPosition);

      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        var latlng = mouseEvent.latLng;
        marker.setPosition(latlng);
        infowindow.setPosition(latlng);
      });
    }

    const ps = new kakao.maps.services.Places();

    let bounds = new kakao.maps.LatLngBounds();
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB, {
        // radius: 2000,
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
  }, [partyData, searchPlace]);

  return <TopContainer ref={myMap} />;
};
export default MapContainer;
