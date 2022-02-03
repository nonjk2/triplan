import axios from 'axios';
import React, {Component, useRef} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Highlighter from 'react-native-highlight-words';
import SearchInput from '../../../util/forms/search';
function AddplanSetting(props) {
  
    const ref = useRef()

  


    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <GooglePlacesAutocomplete
                // suppressDefaultStyles={true}
                    // onNotFound={()=>setStateText(true)}
                    isRowScrollable={false} 
                    fetchDetails={true}
                    returnKeyType={'done'} 
                    enablePoweredByContainer={false}
                    // listViewDisplayed={false}
                    disableScroll={true}
                    autoFocus={false}
                    ref={ref}
                    // textInputHide={false}
                    placeholder='관광지 혹은 장소를 검색해주세요'
                    onPress={( data , details ) => {
                        // 'details' is provided when fetchDetails = true
                        // setsearchdata(details)
                        // settoggleon(false)
                        // setCurrentLocation({longitude : details.geometry.location.lng , latitude : details.geometry.location.lat})
                        alert(details.name)
                    }}
                    requestUrl={{
                        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
                        useOnPlatform: "web",
                    }}
                    // listViewDisplayed="auto"
                    renderRightButton={()=><Button title ={'aa'} color ={'#fff'}/>}
                    textInputProps={{
                        InputComp: SearchInput,
                        errorStyle: { color: 'red' },
                      }}
                    query={{
                        key: 'AIzaSyC5mj6-thVYoHzisGzIQbzlighfD04N0q0',
                        language: 'ko',
                        components: 'country:kr',
                    }}
                    // currentLocation={true}
                    // currentLocationLabel='Current location'
                    Lis
                    renderDescription={(description)=>description.structured_formatting.main_text}
                    renderRow={(data,index)=>
                    <View>
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
                        <Highlighter 
                            
                            highlightStyle={{
                                fontSize : 16 , 
                                fontWeight :'200', 
                                lineHeight : 20, 
                                letterSpacing : 1 ,
                                color : '#5585E8'
                            }}
                            searchWords={[]}
                            textToHighlight={data.structured_formatting.secondary_text}
                        />
                        
                    </View>
            }
                debounce={300}
                styles={{
                    container:{

                        
                    },
                    textInputContainer: {
                        backgroundColor : 'green',
                        alignSelf : 'center',
                        position : 'absolute',
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderWidth : 1,
                    },
                    // powered: {right : 10},
                    // poweredContainer: {
                    //     justifyContent: 'flex-end',
                    //     alignItems: 'center',
                    //     borderBottomRightRadius: 5,
                    //     borderBottomLeftRadius: 5,
                    //     borderColor: '#c8c7cc',
                    //     borderTopWidth: 0.5,
                    //     marginRight : 30
                    // },
                    textInput: {
                        bottom : 3,
                        height : '95%',
                        backgroundColor : '#fff',
                        fontSize: 16,
                        borderWidth : 1,
                        
                        
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                    listView:{
                        // backgroundColor : 'green',
                        zIndex : 100,
                        position : 'absolute',
                        alignSelf : 'center',
                        top : 50
                        
                    }
                  }}
                />
        <Button
          title="To Home Screen"
          onPress={() => {
            this.props.navigation.navigate('TRIPIAN');
          }}
        />
        
      </View>
    );
  
}

const styles = StyleSheet.create({});

export default AddplanSetting;
