import AsyncStorage from '@react-native-async-storage/async-storage';


export const setToken = async (value , callback) => {
    const firstPair = ["@triplan_app@email", value.email]
    const secondPair = ["@triplan_app@token", value.token]
    const thirdPair = ["@triplan_app@refToken", value.refreshToken]
    
    try {
      await AsyncStorage.multiSet([firstPair, secondPair,thirdPair],()=>callback())
    } catch(e) {
      //save error
    }
  
    console.log("Done.")
  }
  

  export const getToken = async () => {

  let values
  try {
    values = await AsyncStorage.multiGet([
      '@triplan_app@email',
      '@triplan_app@token',
      '@triplan_app@refToken',
    ])

  } catch(e) {
    // read error
  }
  console.log("Get tokens",values);

  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
}
