import React from 'react';
import MapContainer from '../components/MapContainer';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';

function Main() {
  return (
    <>
      <MapContainer>
        <SearchBar />
      </MapContainer>
      <Sidebar />
      <SearchBar />
    </>
  );
}

export default Main;
