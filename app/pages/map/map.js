import 'react-native-gesture-handler'; 
import React, {useEffect, useState} from 'react'; 
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, Align} from ".";
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View, Alert, FlatList} from "react-native";
import Mapsearch from './search';


  const P0 = {latitude: 37.564362, longitude: 126.977011}; const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292}; const P4 = {latitude: 37.564834, longitude: 126.977218};



    
const MapViewScreen = (props) => {
     
    useEffect(() => { requestLocationPermission(); }, []);
    const [currentLocation, setCurrentLocation] = useState({latitude: 37.53815725, longitude: 126.9307627});
    const locationHandler = (e) => { 
        Alert.alert( "", "Marker?", [ 
                { text: 'Cancel'},
                { text: 'OK', onPress: () => { setCurrentLocation(e);  }}
                // console.warn('onMapClick', JSON.stringify(e));
            ],
            { cancelable: false } 
        ); 
    };

        return <> 
        <NaverMapView style={{
                    width: '100%',
                    height: '100%'}} 
                    showsMyLocationButton={true} 
                    center={{...currentLocation, zoom: 16}} 
                    onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))} 
                    // onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))} 
                    onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                    // onMapClick = {e => locationHandler(e)} 
                    useTextureView
        > 
        <Marker coordinate={currentLocation} onClick={() => console.warn('onClick! p0')} caption={{text: "위치", align: Align.Left}}/>
        <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/> 
        {/* <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>  */}
        {/* <Marker coordinate={P4} onClick={() => console.warn('onClick! p4')} image={require("../../../src/assets/jenny.jpg")} width={48} height={48}/> */}
        {/* <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>  */}
        {/* <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>  */}
        {/* <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>  */}
        {/* <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/>  */}
        </NaverMapView>
        <View style ={{
            width : 343,
            height : 500,
            position :'absolute',
            top :'10%'}}>
            <Mapsearch/>
        </View>
         
        <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress = {props.close}> 
            <View style={{backgroundColor: 'gray', padding: 4}}> 
                <Text style={{color: 'white'}}>뒤로가기</Text> 
            </View> 
        </TouchableOpacity>
        </> };
        
    async function requestLocationPermission(){ 
        if (Platform.OS !== 'android') return;
        try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            { title: 'Location Permission',
                message: 'show my location need Location permission', 
                buttonNeutral: 'Ask Me Later', 
                buttonNegative: 'Cancel', 
                buttonPositive: 'OK', 
            }, 
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED){ 
            console.log('You can use the location'); 
            }else{ 
            console.log('Location permission denied');
            } 
        }catch (err) {
            console.warn(err);
    } 
} 
          
export default MapViewScreen;

