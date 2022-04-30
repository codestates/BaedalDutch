import React from 'react';
import ButtonMenu from '../components/ButtonMenu';
import MapContainer from '../components/MapContainer';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';

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
