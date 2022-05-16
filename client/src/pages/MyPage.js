import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginAction, loginUserAction } from '../store/login';
import DaumPostcode from 'react-daum-postcode';
import Swal from 'sweetalert2';
import axios from 'axios';
import AWS from 'aws-sdk';
import '../styled/Mypage.css';
import defaultImage from '../assets/people.png';
import loading from '../assets/loading.gif';
const S3_BUCKET = 'baedaldutch-profile';
const REGION = 'ap-northeast-2';
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});
const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const { kakao } = window;

function MyPage() {
  const [Images, setImages] = useState(null);

  // 주소
  const [visible, setVisible] = useState(false);

  // 회원탈퇴 테스트
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login.loginUser);
  const isLogin = useSelector((state) => state.login.isLogin);
  const lat = useSelector((state) => state.location.lat);
  const lng = useSelector((state) => state.location.lng);

  const navigate = useNavigate();
  const nicknameRegExp = /^[a-zA-Zㄱ-힣0-9]*$/;
  const passwordRegExp = /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]{8,16}$/;
  const phone_numberRegExp = /^[0-9]{10,11}$/;

  const [settingUserinfo, setSettingUserinfo] = useState({
    id: loginUser.id,
    image: loginUser.image,
    nickname: loginUser.nickname,
    phone_number: loginUser.phone_number,
    address: loginUser.address,
    password: loginUser.password,
    passwordCheck: loginUser.passwordCheck,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [message, setMessage] = useState({
    nicknameMessage: '',
    phone_numberMessage: '',
    passwordMessage: '',
    passwordCheckMessage: '',
    errorMessage: '',
  });

  const [validation, setValidation] = useState({
    nicknameValidation: false,
    phone_numberValidation: false,
    passwordValidation: false,
    passwordCheckValidation: false,
  });

  const [changeInfoBtn, setChangeInfoBtn] = useState(false);

  useEffect(() => {
    // window.addEventListener('resize', closePostList);
    // return () => {
    //   window.addEventListener('resize', closePostList);
    // };
  }, []);

  // 마이페이지 회원정보 유효성검사
  const settingOnChange = (key) => (e) => {
    setSettingUserinfo({ ...settingUserinfo, [key]: e.target.value });

    if (key === 'nickname') {
      if (
        e.target.value.length < 2 ||
        e.target.value.length > 10 ||
        !nicknameRegExp.test(e.target.value)
      ) {
        setMessage({ ...message, nicknameMessage: '2~10자 한글, 영어 , 숫자만 사용 가능 합니다' });
        setValidation({ ...validation, nicknameValidation: true });
      } else {
        setValidation({ ...validation, nicknameValidation: false });
        setMessage({ ...message, nicknameMessage: '' });
      }
    }

    if (key === 'phone_number') {
      if (
        e.target.value.length < 10 ||
        e.target.value.length > 11 ||
        !phone_numberRegExp.test(e.target.value)
      ) {
        setMessage({ ...message, phone_numberMessage: '"-" 하이픈 없이 번호만 입력해주세요.' });
        setValidation({ ...validation, phone_numberValidation: true });
      } else {
        setValidation({ ...validation, phone_numberValidation: false });
        setMessage({ ...message, phone_numberMessage: '' });
      }
    }

    if (key === 'password') {
      if (!passwordRegExp.test(e.target.value)) {
        setMessage({
          ...message,
          passwordMessage: '8~16자 영문 대 소문자, 숫자, 특수문자만 사용 가능합니다',
        });
        setValidation({ ...validation, passwordValidation: true });
      } else {
        setValidation({ ...validation, passwordValidation: false });
        setMessage({ ...message, passwordMessage: '' });
      }
    }
    if (key === 'passwordCheck') {
      if (e.target.value !== settingUserinfo.password) {
        setMessage({ ...message, passwordCheckMessage: '비밀번호가 일치하지 않습니다' });
        setValidation({ ...validation, passwordCheckValidation: true });
      } else {
        setValidation({ ...validation, passwordCheckValidation: false });
        setMessage({ ...message, passwordCheckMessage: '' });
      }
    }
  };

  const clickHomelBtn = () => {
    navigate('/');
  };

  // 마이페이지 수정
  const handleUserEdit = (selectedFile) => {
    console.log('0');
    console.log('selectedFile', selectedFile);
    const { nickname, phone_number, address, password, passwordCheck } = settingUserinfo;
    console.log('??????????', settingUserinfo);
    setChangeInfoBtn(true);
    if (changeInfoBtn) {
      console.log('2');
      if (
        !nickname ||
        !phone_number ||
        !address ||
        ((!password || !passwordCheck) && password !== passwordCheck)
      ) {
        setMessage({ ...message, errorMessage: '모든 항목은 필수입니다' });
        setValidation({ ...validation, errorValidation: true });
      } else if (message.nicknameMessage === '이미 존재하는 닉네임입니다') {
        console.log('3');
        setMessage({ ...message, errorMessage: '다시 입력해주세요' });
        setValidation({ ...validation, errorValidation: true });
      } else {
        console.log('4');
        dispatch(loginUserAction(settingUserinfo));
        console.log('settingUserinfo:', settingUserinfo);
        axios
          .patch(
            `${process.env.REACT_APP_API_URL}/users/mypage`,
            {
              id: settingUserinfo.id,
              image: selectedFile,
              nickname: settingUserinfo.nickname,
              phone_number: settingUserinfo.phone_number,
              address: settingUserinfo.address,
              password: settingUserinfo.password,
              passwordCheck: settingUserinfo.passwordCheck,
            },
            { withCredentials: true },
          )
          .then((data) => {
            if (data.status === 200) {
              const userInfoNewSearchAddress = () => {
                const geocoder = new kakao.maps.services.Geocoder();

                let callback = function (result, status) {
                  if (status === 'OK') {
                    const newAddSearch = result[0];
                    // console.log('newAddSearch',newAddSearch)
                    const newAddSearchLng = newAddSearch.x;
                    const newAddSearchLat = newAddSearch.y;
                    dispatch(lat(newAddSearchLat));
                    dispatch(lng(newAddSearchLng));
                  }
                };
                geocoder.addressSearch(`${data.data.data.address}`, callback);
              };
              userInfoNewSearchAddress();
              dispatch(loginUser(data.data.data));
            } else {
              console.log('err');
            }
          })
          .catch((err) => console.log(err));

        setMessage({ ...message, errorMessage: '' });
        Swal.fire({
          title: '수정 완료',
          width: 500,
          padding: '3em',
          confirmButtonColor: '#B51D29',
          color: 'black',
          background: '#fff ',
          backdrop: ` 
          rgba(0,0,0,0.4)
        `,
        });
        setChangeInfoBtn(!changeInfoBtn);
      }
    }
  };

  const handleOnBlurNickName = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/checkNickName`,
        { nickname: e.target.value },
        { withCredentials: true },
      )
      .then((res) => {
        console.log('res:', res);
        if (loginUser.nickname === e.target.value) {
          setValidation({ ...validation, nicknameValidation: false });
          setMessage({ ...message, nicknameMessage: '' });
        } else if (
          e.target.value.length < 2 ||
          e.target.value.length > 10 ||
          !nicknameRegExp.test(e.target.value)
        ) {
          setMessage({
            ...message,
            nicknameMessage: '2~10자 한글, 영어 , 숫자만 사용 가능 합니다',
          });
          setValidation({ ...validation, nicknameValidation: true });
        } else if (res.data.message === '이미 사용중인 닉네임입니다.') {
          setMessage({ ...message, nicknameMessage: '이미 사용중인 닉네임입니다.' });
          setValidation({ ...validation, nicknameValidation: true });
        } else {
          setValidation({ ...validation, nicknameValidation: false });
          setMessage({ ...message, nicknameMessage: '사용 가능한 닉네임입니다.' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserDelete = () => {
    Swal.fire({
      title: '탈퇴하시겠습니까?',
      padding: '3em',
      showCancelButton: true,
      confirmButtonColor: '#D4AA71',
      cancelButtonColor: '#B51D29',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.value) {
        // dispatch(axiosUserDelete());
        console.log(document.cookie);
        axios.delete(`${process.env.REACT_APP_API_URL}/users/${loginUser.id}`, {
          withCredentials: true,
        });
        dispatch(isLoginAction(false));
        navigate('/');
      } else {
      }
    });
  };
  // 주소 검색 api
  const handleComplete = (loginUser) => {
    let fullAddress = loginUser.address;
    let extraAddress = '';

    if (loginUser.addressType === 'R') {
      if (loginUser.bname !== '') {
        extraAddress += loginUser.bname;
      }
      if (loginUser.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${loginUser.buildingName}` : loginUser.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setSettingUserinfo({ ...settingUserinfo, address: fullAddress });
    setVisible(false);
  };

  // 주소 검색시 lat, lng 받기
  const newSearchAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      if (status === 'OK') {
        const newAddSearch = result[0];
        setSettingUserinfo({ ...settingUserinfo, lat: newAddSearch.y, lng: newAddSearch.x });
      }
    };
    geocoder.addressSearch(`${settingUserinfo.address}`, callback);
  };

  // 프로필 이미지 로직 시작
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileImage, setFileImage] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [preview, setPreview] = useState(false);
  const fileInput = useRef(null);
  /* 이미지 저장 버튼 눌렀을 때 S3 업로드, 서버 요청 */
  const handleUpload = (file) => {
    console.log('file:', file);
    if (!file) console.log('이미지 없음');
    else {
      setIsLoad(true);
      setPreview(!preview);

      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
        ContentType: 'image/png, image/jpeg, image/gif',
      };

      myBucket.putObject(params, (err, data) => {
        console.log('params:', params);
        const imageSrc = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`;
        console.log('imageSrc:', imageSrc);
        setSettingUserinfo({
          id: loginUser.id,
          image: imageSrc,
          nickname: loginUser.nickname,
          phone_number: loginUser.phone_number,
          address: loginUser.address,
          password: loginUser.password,
          passwordCheck: loginUser.passwordCheck,
        });
        console.log('settingUserinfo', settingUserinfo);
        console.log('loginUser:', loginUser);
        console.log('data:', data);
        console.log('err:', err);

        setTimeout(() => {
          setIsLoad(false);
          saveProfile(imageSrc);
        }, 1000);
      });
    }
  };
  /* 프로필 이미지 저장 요청 */
  const saveProfile = (src) => {
    console.log('프로필 이미지 저장 진입');
    console.log('src:', src);
    try {
      axios.patch(
        `${process.env.REACT_APP_API_URL}/users/mypage`,
        {
          image: src,
        },
        { withCredentials: true },
      );
    } catch (e) {
      console.log(e);
    }
  };
  /* 프로필 이미지 변경값 저장 */
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileImage(URL.createObjectURL(e.target.files[0]));
      setPreview(!preview);
    } else return;
  };

  // 프로필 이미지 로직 끝

  return (
    <div>
      <Wrapper>
        <MapDiv>
          <MyPageDiv>
            {/* <div className="mypage-edit">
              <div className="edit-title">Edit Profile</div>
              <div className="profile-box">
                {preview ? (
                  <img src={fileImage} className="img-box" alt="preview" />
                ) : !isLoad ? (
                  <img
                    src={settingUserinfo.image}
                    alt="profile"
                    className="img-box"
                    onClick={() => {
                      fileInput.current.click();
                    }}
                  />
                ) : (
                  <img alt="loading" className="img-box" id="loading" />
                )}
              </div>
              <input type="file" id="image" accept="img/*" onChange={handleImage} ref={fileInput} />
              <div className="edit-button">
                <button
                  className="edit-profile"
                  onClick={() => {
                    handleUpload(selectedFile);
                  }}
                >
                  이미지 저장
                </button>
                {/* <button
                  className="edit-profile"
                  onChange={handleImage}
                  onClick={() => {
                    setSettingUserinfo({
                      image: defaultImage,
                    });
                    saveProfile(
                      'https://baedaldutch-profile.s3.ap-northeast-2.amazonaws.com/people.png',
                    );
                  }}
                >
                  기본 이미지
                </button> */}
            {/* </div>
            </div> */}
            {changeInfoBtn ? (
              // 회원정보 수정
              <MyPageForm onSubmit={(e) => e.preventDefault()}>
                <InputTitle>닉네임</InputTitle>
                <InputField
                  onBlur={(e) => handleOnBlurNickName(e)}
                  defaultValue={loginUser.nickname}
                  onChange={settingOnChange('nickname')}
                />
                {settingUserinfo.nickname.length > 0 && validation.nicknameValidation ? (
                  <Err>{message.nicknameMessage}</Err>
                ) : null}
                <InputTitle>전화번호</InputTitle>
                <InputField
                  defaultValue={loginUser.phone_number}
                  onChange={settingOnChange('phone_number')}
                />
                {settingUserinfo.phone_number.length > 0 && validation.phone_numberValidation ? (
                  <Err>{message.phone_numberMessage}</Err>
                ) : null}
                <InputTitle>주소</InputTitle>
                {visible ? (
                  <div className="test">
                    <CloseBtn onClick={() => setVisible(false)}>닫기</CloseBtn>
                    <DaumPostcode
                      onComplete={handleComplete}
                      onSuccess={newSearchAddress}
                      height={700}
                      className="DaumPost"
                    />
                  </div>
                ) : null}

                {settingUserinfo.address === '' ? (
                  <AddressInputDiv onClick={() => setVisible(true)}>
                    주소를 검색 해주세요
                  </AddressInputDiv>
                ) : (
                  <AddressInputDiv
                    onClick={() => setVisible(true)}
                    onChange={settingOnChange('address')}
                  >
                    {settingUserinfo.address}
                  </AddressInputDiv>
                )}
                <InputTitle>비밀번호</InputTitle>
                <InputFieldPassWordSize type="password" onChange={settingOnChange('password')} />
                {validation.passwordValidation ? <Err>{message.passwordMessage}</Err> : null}
                <InputTitle>비밀번호확인</InputTitle>
                <InputFieldPassWordSize
                  type="password"
                  onChange={settingOnChange('passwordCheck')}
                />
                {validation.passwordCheckValidation ? (
                  <Err>{message.passwordCheckMessage}</Err>
                ) : null}
                <SignUpToLogin onClick={handleUserDelete}>회원탈퇴</SignUpToLogin>
                <Err>{message.errorMessage}</Err>
                <EditButton
                  onClick={() => {
                    handleUpload(selectedFile);
                    handleUserEdit();
                  }}
                >
                  수정완료
                </EditButton>
              </MyPageForm>
            ) : (
              // 기존의 회원정보
              <MyPageForm onSubmit={(e) => e.preventDefault()}>
                <InputTitle>프로필 수정</InputTitle>
                <Div>
                  <ProfileImg>
                    {preview ? (
                      <img src={fileImage} className="img-box" alt="preview" />
                    ) : !isLoad ? (
                      <img
                        src={settingUserinfo.image}
                        alt="profile"
                        className="img-box"
                        onClick={() => {
                          fileInput.current.click();
                        }}
                      />
                    ) : (
                      <img src={loading} alt="loading" className="img-box" id="loading" />
                    )}
                  </ProfileImg>
                  <input
                    type="file"
                    id="image"
                    accept="img/*"
                    onChange={handleImage}
                    ref={fileInput}
                  />
                  <WrapButton>
                    <UploadButton
                      onClick={() => {
                        handleUpload(selectedFile);
                      }}
                    >
                      이미지 저장
                    </UploadButton>
                    {/* <DeleteButton
                      onClick={() => {
                        // 진행중
                        setFileImage(test);
                        setSettingUserinfo({ image: test });
                      }}
                    >
                      이미지 삭제
                    </DeleteButton> */}
                  </WrapButton>
                </Div>
                <InputTitle>닉네임</InputTitle>
                <Div>{loginUser.nickname}</Div>
                <InputTitle>전화번호</InputTitle>
                <Div>{loginUser.phone_number}</Div>
                <InputTitle>주소</InputTitle>
                <Div>{loginUser.address}</Div>
                {/* <InputTitle>비밀번호</InputTitle>
                <InputFieldPassWord />
                <InputTitle>비밀번호확인</InputTitle>
                <InputFieldPassWord /> */}
                <SignUpToLogin onClick={handleUserDelete}>회원탈퇴</SignUpToLogin>
                <EditButton
                  onClick={() => {
                    handleUserEdit();
                  }}
                >
                  수정하기
                </EditButton>
              </MyPageForm>
            )}
          </MyPageDiv>
        </MapDiv>
        <HomeButton onClick={clickHomelBtn}>
          <i className="fa-solid fa-house-chimney"></i>
        </HomeButton>
      </Wrapper>
    </div>
  );
}

const CloseBtn = styled.button`
  display: block;
  margin-left: 400px;
  z-index: 100;
  padding: 7px;
  width: 100px;
  color: white;
  background-color: #b51d29;
  border: none;
  border-radius: 6px;
  @media (max-width: 576px) {
    margin-left: 240px;
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const MapDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  border: 1px solid pink;
  /* @media (max-width: 576px) {
    display: ${(props) => (props.openPost ? 'none' : 'block')};
    visibility: visible;
    margin-right: 0px;
    padding-right: 0px;
    width: 576px;
  } */
`;

const MyPageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  max-width: auto;
`;

const HomeButton = styled.button`
  font-family: var(--main-font);
  font-size: 30px;
  display: ${(props) => (props.openPost ? 'none' : 'block')};
  position: fixed;
  bottom: 60px;
  right: 16px;
  border-radius: 100%;
  border: none;
  width: 80px;
  height: 80px;
  background-color: rgba(242, 198, 112);
  color: white;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 576px) {
    width: 70px;
    height: 70px;
    font-size: 30px;
  }
  @media (max-width: 400px) {
    width: 70px;
    height: 70px;
    bottom: 75px;
  }
`;

const MyPageForm = styled.form`
  float: left;
  margin-left: 50px;
  margin-top: 100px;
`;

const InputTitle = styled.div`
  margin-top: 10px;
  font-size: 25px;
  @media (max-width: 576px) {
    margin-top: 3px;
    font-size: 18px;
  }
  @media (max-width: 400px) {
    margin-left: -20px;
    font-size: 16px;
  }
`;

const InputField = styled.input`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 56px;
  font-size: 18px;
  margin-top: 10px;
  border: solid #c4c4c4 1px;
  border-radius: 3px;
  padding-left: 5px;
  &:focus {
    outline: none;
    border: 1px solid #d9c6ac;
  }
  @media (max-width: 576px) {
    width: 340px;
    height: 46px;
    border-radius: 3px;
  }
  @media (max-width: 400px) {
    width: 300px;
    height: 46px;
    bottom: 140px;
    margin-left: -21px;
    margin-top: 1px;
    font-size: 16px;
  }
`;

const InputFieldPassWordSize = styled.input`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 56px;
  font-size: 18px;
  margin-top: 10px;
  border: solid #c4c4c4 1px;
  border-radius: 3px;
  padding-left: 5px;
  &:focus {
    outline: none;
    border: 1px solid #d9c6ac;
  }
  @media (max-width: 576px) {
    width: 340px;
    height: 46px;
    border-radius: 3px;
  }
  @media (max-width: 400px) {
    width: 240px;
    height: 46px;
    bottom: 140px;
    margin-left: -21px;
    margin-top: 1px;
    font-size: 16px;
  }
`;

const InputFieldPassWord = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 56px;
  font-size: 18px;
  margin-top: 10px;
  border: solid #e2e2e2 1px;
  padding-left: 5px;
  @media (max-width: 400px) {
    width: 240px;
    height: 46px;
    bottom: 140px;
    margin-left: -21px;
    margin-top: 1px;
    font-size: 16px;
  }
`;

const Div = styled.div`
  width: 500px;
  height: 56px;
  font-size: 20px;
  color: grey;
  margin-top: 30px;
  @media (max-width: 400px) {
    margin-left: -20px;
    font-size: 16px;
    margin-bottom: -21px;
  }
`;

const EditButton = styled.button`
  float: center;
  width: 200px;
  height: 56px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 6px;
  margin-top: 30px;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 576px) {
    width: 150px;
    height: 46px;
    float: left;
    margin-left: 20%;
  }
  @media (max-width: 400px) {
    width: 150px;
    height: 46px;
    float: left;
    margin-left: 5%;
    font-size: 16px;
  }
  @media (max-width: 380px) {
    width: 140px;
    height: 40px;
    float: left;
    margin-top: -27px;
    margin-left: 80px;
    font-size: 16px;
  }
`;

const SignUpToLogin = styled.div`
  margin-top: 20px;
  font-size: 15px;
  color: red;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 400px) {
    margin-left: -20px;
  }
`;

const Err = styled.div`
  font-size: 14px;
  color: red;
  margin-top: 2px;
`;

const AddressInputDiv = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  width: 500px;
  height: 56px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px #c4c4c4 solid;
  border-radius: 3px;
  color: gray;
  padding-left: 5px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 576px) {
    width: 340px;
    height: 46px;
  }
  @media (max-width: 400px) {
    width: 300px;
    height: 46px;
    bottom: 140px;
    margin-left: -21px;
    margin-top: -5px;
    font-size: 16px;
  }
`;

const ProfileImg = styled.div`
  position: absolute;
  top: 150px;
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: center;
`;

const DeleteButton = styled.button``;
const UploadButton = styled.button``;

export default MyPage;
