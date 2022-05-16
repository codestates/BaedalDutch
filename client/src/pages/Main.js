import React from 'react';
import ButtonMenu from '../components/Main/ButtonMenu';
import MapContainer from '../components/Main/MapContainer';
import SearchBar from '../components/Main/SearchBar';
import Sidebar from '../components/Main/Side/Sidebar';

function Main() {
  return (
    <>
      <MapContainer />
      <Sidebar />
      <SearchBar />
      <ButtonMenu />
    </>
  );
}

export default Main;
