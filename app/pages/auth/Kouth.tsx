// import React, {useState} from 'react';
// import {
//     KakaoOAuthToken,
//     KakaoProfile,
//     getProfile as getKakaoProfile,
//     login,
//     logout,
//     unlink,
//   } from '@react-native-seoul/kakao-login';
// import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { View } from 'react-native-animatable';
  
  

  
  
  
//   function Intro(): React.ReactElement {
//     const [result, setResult] = useState<string>('');
  
//     const signInWithKakao = async (): Promise<void> => {
//       const token: KakaoOAuthToken = await login();
  
//       setResult(JSON.stringify(token));
//     };
  
//     const signOutWithKakao = async (): Promise<void> => {
//       const message = await logout();
  
//       setResult(message);
//     };
  
//     const unlinkKakao = async (): Promise<void> => {
//       const message = await unlink();
  
//       setResult(message);
//     };
  
//     return (


//     );
//   }
  
//   export default Intro;