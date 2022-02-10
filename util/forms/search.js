import React from "react";
import { TextInput , StyleSheet , Text, View} from 'react-native';


const SearchInput = (props) => (
    // <View style = {{justifyContent : 'center'}}>
    <TextInput
        {...props}
        style = {styles.input}
        // textAlignVertical = {'center'}
    />
    // </View>
)

const styles = StyleSheet.create({
    textname : {
        paddingLeft : 7,
        paddingBottom : 5,
        fontSize : 18,
        color : '#fff',
        fontWeight : '700',
    },

  container : {
    flex: 1,
    backgroundColor : '#fff',
    paddingHorizontal: 30,


  },
  input : {
    top : 2.5,
    textAlignVertical : 'center',
    // paddingHorizontal : 30,
    fontSize : 16,
    justifyContent : 'center',
    alignItems :'center',

    
  }
});
export default SearchInput;