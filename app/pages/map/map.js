import 'react-native-gesture-handler'; 
import React, {useEffect, useRef, useState} from 'react'; 
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, Align} from ".";
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View, Alert, FlatList, Image, ImageBackground} from "react-native";
import Mapsearch from './search';
import { LayerGroup } from '.';


  const P0 = {latitude: 37.564362, longitude: 126.977011}; const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292}; const P4 = {latitude: 37.564834, longitude: 126.977218};
  const P5 = {latitude: 37.562834, longitude: 126.976218};


    
// const MapViewScreen = (props) => {
     
    // useEffect(() => { requestLocationPermission(); }, []);
    
    

//         return <> 
//         <NaverMapView style={{
//                     width: '100%',
//                     height: '100%'}} 
//                     showsMyLocationButton={true} 
//                     center={{...currentLocation, zoom: 16}} 
//                     onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))} 
//                     onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))} 
//                     onMapClick={e => console.log('onMapClick', JSON.stringify(e))}
//                     onMapClick = {e => locationHandler(e)} 
//                     useTextureView
//         > 
//         <Marker coordinate={currentLocation} onClick={() => console.log('onClick! p0')} caption={{text: "위치", align: Align.Left}}/>
//         <Marker coordinate={P1} pinColor="blue" onClick={() => console.log('onClick! p1')}/> 
//         {/* <Marker coordinate={P2} pinColor="red" onClick={() => console.log('onClick! p2')}/>  */}
//         {/* <Marker coordinate={P4} onClick={() => console.log('onClick! p4')} image={require("../../../src/assets/jenny.jpg")} width={48} height={48}/> */}
//         {/* <Path coordinates={[P0, P1]} onClick={() => console.log('onClick! path')} width={10}/>  */}
//         {/* <Polyline coordinates={[P1, P2]} onClick={() => console.log('onClick! polyline')}/>  */}
//         {/* <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.log('onClick! circle')}/>  */}
//         {/* <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.log('onClick! polygon')}/>  */}
//         </NaverMapView>
//         <View style ={{
//             width : 343,
//             height : 500,
//             position :'absolute',
//             top :'10%'}}>
//             <Mapsearch/>
//         </View>
         
//         <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress = {props.close}> 
//             <View style={{backgroundColor: 'gray', padding: 4}}> 
//                 <Text style={{color: 'white'}}>뒤로가기</Text> 
//             </View> 
//         </TouchableOpacity>
//         </> };
    const MapViewScreen = ({navigation}) => {
        const mapView = useRef(null);
        
        useEffect(() => {
            requestLocationPermission();
        }, []);
        const [currentLocation, setCurrentLocation] = useState({latitude: 37.565051, longitude: 126.978567});
        const [enableLayerGroup, setEnableLayerGroup] = useState(true);
        const locationHandler = (e) => { 
            Alert.alert( "", "Marker?", [ 
                    { text: 'Cancel'},
                    { text: 'OK', onPress: () => { setCurrentLocation(e);  }}
                    // console.log('onMapClick', JSON.stringify(e));
                ],
                { cancelable: false } 
            ); 
        };
        return <>
            <NaverMapView ref={mapView}
                          style={{width: '100%', height: '100%'}}
                          showsMyLocationButton={true}
                          center={{...P0, zoom: 16}}
                        //   onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                          onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
                          onMapClick={e => locationHandler(e)}
                          useTextureView>
                <Marker coordinate={P0}
                    onClick={() => {
                        console.log('onClick! p0')
                        mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BICYCLE, enableLayerGroup);
                        mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_TRANSIT, enableLayerGroup);
                        setEnableLayerGroup(!enableLayerGroup)
                    }}
                    caption={{ text: "test caption", align: Align.Left }}
                />
                <Marker coordinate={currentLocation} pinColor="blue" zIndex={1000} onClick={() => console.warn('onClick! p1')}/>
                <Marker coordinate={P2} pinColor="red" zIndex={100} alpha={0.5} onClick={() => console.log('onClick! p2')}/>
                <Marker coordinate={P4} onClick={() => console.log('onClick! p4')} image={require("../../../src/assets/jenny.jpg")} width={48} height={48}/>
                <Path coordinates={[P0, P1]} onClick={() => console.log('onClick! path')} width={10}/>
                <Polyline coordinates={[P1, P2]} onClick={() => console.log('onClick! polyline')}/>
                <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.log('onClick! circle')}/>
                <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.log('onClick! polygon')}/>
                <Marker coordinate={P5} onClick={() => console.log('onClick! p0')} width={96} height={96}>
                    <View style={{backgroundColor: 'rgba(255,0,0,0.2)', borderRadius: 80}}>
                        <View style={{backgroundColor: 'rgba(0,0,255,0.3)', borderWidth: 2, borderColor: 'black', flexDirection: 'row'}}>
                            <Image source={require("../../../src/assets/jenny.jpg")} style={{
                                width: 32, height: 32,
                                backgroundColor: 'rgba(0,0,0,0.2)', resizeMode: 'stretch',
                                borderWidth: 2, borderColor: 'black'
                            }} fadeDuration={0}/>
                            <Text>Image</Text>
                        </View>
                        <ImageBackground source={require("../../../src/assets/jenny.jpg")} style={{width: 64, height: 64}}>
                            <Text>image background</Text>
                        </ImageBackground>
                    </View>
                </Marker>
            </NaverMapView>
            <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress={() => navigation.navigate('stack')}>
                <View style={{backgroundColor: 'gray', padding: 4}}>
                    <Text style={{color: 'white'}}>open stack</Text>
                </View>
            </TouchableOpacity>
            <Text style={{position: 'absolute', top: '95%', width: '100%', textAlign: 'center'}}>Icon made by Pixel perfect from www.flaticon.com</Text>
        </>
    };
    
        
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
            console.log(err);
    } 
} 
          
export default MapViewScreen;

