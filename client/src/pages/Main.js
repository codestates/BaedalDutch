import React from 'react';
import { useMediaQuery } from 'react-responsive';
import ButtonMenu from '../components/Main/ButtonMenu';
import MapContainer from '../components/Main/MapContainer';
import SearchBar from '../components/Main/SearchBar';
import Sidebar from '../components/Main/Side/Sidebar';

function Main() {
  const test = useMediaQuery({ query: '(width: 800px)' }, undefined);
  if (test) {
    alert('hi');
  }

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
