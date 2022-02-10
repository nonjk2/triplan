import 'react-native-gesture-handler'; 
import React, {createRef, useEffect, useRef, useState} from 'react'; 
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, Align} from ".";

import {PermissionsAndroid, Platform, Text, TouchableOpacity, View, Alert, FlatList, Image, ImageBackground, Dimensions, TouchableWithoutFeedback} from "react-native";
import Mapsearch from './search';
import { LayerGroup } from '.';

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
const P0 = {latitude: 37.59229660205149,longitude: 126.97558048678314, index: 0}; const P1 = {latitude: 37.821181701506276,longitude: 127.54229189686288,index: 1};
const P2 = {latitude: 37.67639982426067,longitude: 127.86638861746769, index: 2}; const P4 = {latitude: 37.368526562915974,longitude: 127.92040466073564, index: 3};
const P5 = {latitude: 37.255661731852015,longitude: 127.665888045982, index: 5};
const MyArray = [P0,P1,P2,P4,P5]


    


    const MapViewScreen = (props) => {
        const mapView = useRef(null)
        const Markerview = useRef(null)
        // const LocatinIndex = props.
        const {caroucelIndex,MarkerDATA,startDate,DATA,setdayindex,planday,dayindex} = props;

        useEffect(() => {

            
            requestLocationPermission()
            setCurrentLocation(MyArray[caroucelIndex])
        });
        const [currentLocation, setCurrentLocation] = useState(MyArray[caroucelIndex]);
        const [enableLayerGroup, setEnableLayerGroup] = useState(false);
        const [myMarker,setmyMarker]=useState(MarkerDATA)

        const locationHandler = (e) => { 
            Alert.alert( "", "Marker?", [ 
                    { text: 'Cancel'},
                    { text: 'OK', onPress: () =>
                    {console.log('onMapClick', e)} 
                    // { setCurrentLocation(e);  }
                }
                    // console.log('onMapClick', JSON.stringify(e));
                ],
                { cancelable: false } 
            ); 
        };

        const setDay =(index) =>{
            setdayindex(index)
            setmyMarker(DATA.filter(e=>new Date(e.startDatetime).getDate()===new Date(startDate).getDate()+index))
          }

        return <>
            <NaverMapView 
                ref={mapView}
                style={{width: '100%', height: '100%'}}
                showsMyLocationButton={true}
                center={{...currentLocation, zoom: 16}}
                nightMode={false}
                mapType={0}
                useTextureView>
                        {myMarker.map(e=>{
                        return(
                        <Marker
                            
                            width ={24}
                            height = {24}
                            // pinColor={'#5585E8'}
                            coordinate={e.map_id} 
                            zIndex={1000} 
                            key={e.schedule_id}
                            animated={true}
                            image={require(`../../../src/assets/Vector1.png`)}
                            onClick={() => {
                            mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BICYCLE, enableLayerGroup);
                            mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_TRANSIT, enableLayerGroup);
                            mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BUILDING, enableLayerGroup);
                            mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_CADASTRAL, enableLayerGroup);
                            setEnableLayerGroup(!enableLayerGroup)
                            
                        }}
                        >

                        </Marker>
                        )}
                            )}
                            

                {/* <Path coordinates={MyArray} width={5}/> */}
                {/* <Polyline coordinates={MyArray} /> */}
                {/* <Marker coordinate={P2} pinColor="red" zIndex={100} alpha={0.5} />
                <Marker coordinate={P4} image={require("../../../src/assets/jenny.jpg")} width={48} height={48}/>
                <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200}/>
                <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} />
                <Marker coordinate={P5} width={96} height={96}>
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
                </Marker> */}
            </NaverMapView>
            <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress={() => navigation.navigate('stack')}>
                <View style={{backgroundColor: 'gray', padding: 4}}>
                    <Text style={{color: 'white'}}>open stack</Text>
                </View>
            </TouchableOpacity>
            <View
          style = {{position : 'absolute', top : '18%' , flexDirection : 'row' ,width : WIDTH -32 , height : 40, alignContent : 'flex-start'}}
        >
          {[...Array(planday)].map((e,index)=>{
            return(
            <TouchableWithoutFeedback
                onPress = {()=> setDay(index)}
                key = {index}
                
            >
                <View
                style = {{backgroundColor : '#fff', borderRadius : 20, width : 69 ,height : 40 , marginRight : 10 , justifyContent :'center', alignItems :'center'}}
                >
                <Text style = {{fontSize : 15 ,color: dayindex ===index ?  '#5585E8': '#767676', fontWeight : '500'}}>DAY{index+1}</Text>
                </View>
            </TouchableWithoutFeedback>
          )})}
        </View>

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

