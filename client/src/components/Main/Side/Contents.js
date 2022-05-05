import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Contents = () => {
  const [parties, setParties] = useState([]);
  const getAllData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/parties`);
    setParties(data.data);
  };

  //writeUser_id === Id(내 아이디인지아닌지) => 그래야 마감하기/신청하기 혹은 수정/삭제 화면 보이는지 안보이는지 알수있는데 서버에서 막힘
  const getMyInfo = async () => {
    console.log('데이터들어오나');
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/users/mypage`);
    console.log('데이터');
    console.log(data);
  };

  useEffect(() => {
    getAllData();
    getMyInfo();
  }, []);

  console.log('파리', parties);

  return (
    <div>
      {parties.map((party, i) => {
        console.log(party.food_category);
        return (
          <div>
            <div>{party.store_name}</div>
            <img src={`icon/${party.food_category}.png`} alt=""></img>
          </div>
        );
      })}
    </div>
  );
};
export default Contents;
