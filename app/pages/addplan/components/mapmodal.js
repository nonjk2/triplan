import React, {Component, useEffect, useRef, useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Input from '../../../../util/forms/input';
import * as Animatable from 'react-native-animatable';
import { Button, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View ,Image, ScrollView} from 'react-native';
import NaverMapView, { Marker } from '../../map';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Highlighter from 'react-native-highlight-words';
import SearchInput from '../../../../util/forms/search';
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
////예시데이터////
const P0 = {latitude: 37.566535,longitude: 126.9779692, index: 0};
////예시데이터////
const MYAPI_KEY="AIzaSyC5mj6-thVYoHzisGzIQbzlighfD04N0q0";
const PHOTO = "Aap_uEDDBUinRq6fSh0bTh3WIfIRzmpwl3dBb1KMoAPfCeMebYIVeSt81qwpfExYE841KnWhXMnYIp2qooJcFkmprMgSWQF19s1n9zrHSP9eXQWLrcvQF0IG-cm_GLLR7R_5N_sY53QxfpE9g5-5k1vCmfKBS-qP__TbOqG46N9cmYynMegp"

function MapModal(params) {

    const [toggleon,settoggleon]=useState(false)
    const [search,setsearch]=useState()
    const mapView = useRef(null)
    const [currentLocation, setCurrentLocation] = useState(P0);
    const [enableLayerGroup, setEnableLayerGroup] = useState(false);
    const ref = useRef();
    const [statetext,setStateText]=useState(false)
    const [searchdata,setsearchdata]=useState({geometry : {location : {lat: 37.566535,lng: 126.9779692}}})
    

  useEffect(() => {
    requestLocationPermission()
    // setCurrentLocation({longitude : searchdata.geometry.location.lng , latitude : searchdata.geometry.location.lat})
    
    // ref.current?.setAddressText('Some Text');
  },[]);

    // const redersearch = ({item}) =>{
    //     return(

    //     )
    // }
    return(
        <View style ={{height :HEIGHT, width : WIDTH, borderRadius : 15 ,justifyContent :'flex-start'}}>
            
            <NaverMapView 
                ref={mapView}
                style={{width: '100%', height: '100%' ,borderRadius : 15 , flex : 1}}
                showsMyLocationButton={true}
                scaleBar={false}
                zoomControl={false}
                center={{...currentLocation, zoom: 15}}
                //   onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                //   onCameraChange={e => console.log('onCameraChange',e)}
                //   onMapClick={e => locationHandler(e)}
                buildingHeight={10}
                nightMode={false}
                mapType={0}
                useTextureView >
                    {searchdata.name ? <Marker
                            width ={70}
                            height = {70}
                            // pinColor={'#5585E8'}
                            coordinate={{longitude : searchdata.geometry.location.lng , latitude : searchdata.geometry.location.lat}} 
                            zIndex={1000} 
                            animated={true}
                        >

                        </Marker> :
                        null
                        }
                    
            </NaverMapView>
            {searchdata.name ? 
                <View 
                    style={{bottom : 0,width :WIDTH , height : 320 , backgroundColor : '#FFF'  ,shadowOpacity : .5}}

                >
                    {searchdata.photos ? 
                    <Image source={{uri :`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${searchdata.photos[0].photo_reference}&key=${MYAPI_KEY}`}}
                        style ={{width: WIDTH -10, height : 190 , borderRadius : 15 ,marginHorizontal : 10, marginTop : 10 , alignSelf : 'center' , shadowOpacity : .5 , shadowOffset : {width : 0 , height :2}}}
                    />
                    :<View style={{width: WIDTH -10, height : 190 , borderRadius : 15 ,marginHorizontal : 10, marginTop : 10 , alignSelf : 'center' , shadowOpacity : .5 , shadowOffset : {width : 0 , height :2},alignItems : 'center', justifyContent : 'center'}}>
                        <Text>이미지가 없습니다</Text>    
                    </View>}
                    <View style = {{flexDirection : 'row', borderBottomWidth : .5 , borderColor : '#c4c4c4'}}>
                        <View
                            style={{backgroundColor : '#fff' ,alignItems :'center' , flex : 7}}
                        >
                            <View style={{flexDirection :'row' ,justifyContent : 'center'}}>
                                <Text style = {{fontSize : 20, color : '#5585E8' , lineHeight : 20, padding : 10}}>{searchdata.name}</Text>
                                <Text style={{ fontSize : 15, color : '#c4c4c4' ,marginLeft : 10 ,padding : 10,lineHeight :20}}>장소</Text>
                            </View>
                            <Text style = {{}}>{searchdata.formatted_address}</Text>
                            <Text>{searchdata.international_phone_number}</Text>

                        </View>
                        <View style = {{flex : 3 , justifyContent :'center' , alignItems :'center'}}>
                            <TouchableOpacity 
                                onPress = {()=>params.navigation.navigate({
                                    name : "여행 추가",
                                    params : {search : searchdata},
                                    merge : true
                                })}
                                style = {{backgroundColor : '#5585E8', width : 100,height :30 , borderRadius : 15 , alignItems : 'center', justifyContent :'center'}}>
                                <Text style = {{color : '#fff'}}>출발위치등록</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                </View> : <View></View>}
            {toggleon ? 
            <Animatable.View 
                style={{
                    width : '100%', 
                    height : '55%' ,
                    alignItems : 'center', 
                    justifyContent : 'center' , 
                    position : 'absolute' , 
                    ackgroundColor :'#fff', 
                    borderRadius :10,
                    borderBottomWidth :1.5 ,
                    borderStartWidth :1.5,
                    borderEndWidth :1.5, 
                    borderColor : '#5585E8',
                    shadowOpacity : .5,
                    backgroundColor : '#fff'
                    
                }}
                animation = 'slideInDown'
                duration = {500}
                delay = {200}
                >
                    {ref.current?.isFocused() ? null :  <Text style = {{color : '#C4C4C4'}}>위치를 검색해주세요</Text>  }
                
            </Animatable.View> : null
            
            }
            {toggleon ? null :
            <Animatable.View 
                direction = {'alternate-reverse'}
                animation = {'fadeOut'}
                duration = {200}
                style={{position:'absolute' , right :'2%', top : '12%' ,width : 40,height :40 ,borderRadius : 20, backgroundColor : '#5585E8', padding : 5, margin : 10 , alignItems : 'center' , justifyContent : 'center'}}>
                <TouchableOpacity onPress={()=>params.navigation.goBack()}>
                    <IonIcon name={'chevron-down-outline'} size ={25} color ={'#fff'}/>
                </TouchableOpacity>
            </Animatable.View>
            }
            <Animatable.View 
                style ={[styles.toggle ,toggleon && styles.toggledOn ]}
                transition={['backgroundColor', 'scaleX', 'fontSize','width']}
                // animation = 'slideInRight'
                >
                {toggleon ?

                <GooglePlacesAutocomplete
                    
                    suppressDefaultStyles={true}
                    onNotFound={()=>setStateText(true)}
                    isRowScrollable={false} 
                    fetchDetails={true} 
                    enablePoweredByContainer={false}
                    // listViewDisplayed={false}
                    disableScroll={true}
                    autoFocus={false}
                    ref={ref}
                    textInputHide={false}
                    
                    placeholder='관광지 혹은 장소를 검색해주세요'
                    onPress={( data , details ) => {
                        // 'details' is provided when fetchDetails = true
                        setsearchdata(details)
                        settoggleon(false)
                        setCurrentLocation({longitude : details.geometry.location.lng , latitude : details.geometry.location.lat})
                        console.log(details)
                    }}
                    // requestUrl={{
                    //     url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
                    //     useOnPlatform: "web",
                    // }}
                    // listViewDisplayed="auto"
                    // renderRightButton={()=><Button title ={'aa'} color ={'#fff'}/>}
                    // textInputProps={{
                    //     InputComp: SearchInput,
                    //     errorStyle: { color: 'red' },
                    //   }}
                    query={{
                        key: 'AIzaSyC5mj6-thVYoHzisGzIQbzlighfD04N0q0',
                        language: 'ko',
                        components: 'country:kr',
                    }}
                    // currentLocation={true}
                    // currentLocationLabel='Current location'
                    
                    // renderDescription={(description)=>description.structured_formatting.main_text}
                    renderRow={(data,index)=>
                    <View style = {{ borderBottomWidth : 1,borderBottomColor : '#f5f5f5', paddingVertical : 10, backgroundColor : '#fff', shadowOpacity : .25 ,shadowOffset : {width : 0 , height :2}}}>
                        <Highlighter
                            style={{
                                fontSize : 16 , 
                                fontWeight :'400', 
                                lineHeight : 20,
                                // color : '#5585E8'
                            }} 
                            highlightStyle={{
                                fontSize : 16 , 
                                fontWeight :'400', 
                                lineHeight : 20, 
                                letterSpacing : 1 ,
                                color : '#5585E8'}}
                            searchWords={[ref.current?.getAddressText()]}
                            textToHighlight={data.structured_formatting.main_text}
                        />
                        <Text 
                            style={{
                                fontSize : 14 , 
                                fontWeight :'200', 
                                // letterSpacing : 1 ,
                            }}
                        >{data.structured_formatting.secondary_text}</Text>
                        
                    </View>
                    

                
            }
                debounce={300}
                styles={{
                    container:{
                        
                    },
                    textInputContainer: {
                        backgroundColor : '#fff',
                        width : '95%',
                        height : '100%',
                        borderRadius : 15,
                        paddingHorizontal : 15,
                        // paddingRight : 10,
                        marginRight : 12,

                        
                        // position : 'absolute',
                        // height : '100%',
                        // width : '85%',
                        // borderRadius: 5,
                        // marginHorizontal : 10,
                        
                        
                        // paddingVertical: 5,
                        // paddingHorizontal: 10,
                    },
                    
                    textInput: {
                        // alignSelf : 'center',
                        // bottom : 3,
                        width : '100%',
                        backgroundColor : '#fff',
                        fontSize: 16,
                        top :3,                        
                    },
                    // predefinedPlacesDescription: {
                    //   color: '#1faadb',
                    // },
                    listView:{
                        
                        // width : WIDTH,
                        // zIndex : 100,
                        position : 'absolute',
                        top : 50,
                        // borderWidth : 1,
                        
                    }
                  }}
                />
                
                 : null
                }    

                {toggleon ? 
                <TouchableOpacity onPress={()=>settoggleon(!toggleon)} style ={{position : 'absolute' , alignSelf : 'flex-end' ,right :10  }}>
                    <IonIcon name={'chevron-forward-outline'} size ={25} color ={'#5585E8'}/>
                </TouchableOpacity> 
                    :
                <TouchableOpacity onPress={()=>settoggleon(!toggleon)} style ={{position : 'absolute', alignSelf : 'center'  }}>
                    <IonIcon name={'search-outline'} size ={25} color ={'#ffffff'}/>
                </TouchableOpacity>
                }

            </Animatable.View>
            
        </View>
    )
}

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
}}

const styles = StyleSheet.create({
    toggle: {
        position : 'absolute',
        width: 40,
        right : '2%',
        top: '5%',
        height : 40,
        backgroundColor: '#5585E8',
        borderRadius: 20,
        padding: 5,
        fontSize: 14,
        alignSelf: 'flex-end',
        textAlign: 'center',
        justifyContent : 'center',
        margin: 10,
        color: 'rgba(255, 255, 255, 1)',
        },
    toggledOn: {
    justifyContent : 'center',
    // position : 'absolute',
    // zIndex : 1,
    backgroundColor : '#fff',
    borderRadius : 15,
    borderWidth : 1.5,
    borderColor : '#5585E8',    
    color: 'rgba(255, 33, 33, 1)',
    fontSize: 16,
    width : WIDTH * 0.9,
    shadowOffset : {
        width : 2,
        height : 0
    },
    shadowColor : '#000',
    shadowOpacity : .5,
    transform: [
        // {
        // rotate: '50deg',
        // },
        {scaleX: 1},
        ],
    },
    
});
export default MapModal;