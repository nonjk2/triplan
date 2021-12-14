import React from "react";
import { TextInput , StyleSheet , Text, View} from 'react-native';


const SearchInput = (props) => (
    <View>
    <TextInput
        {...props}
        style = {styles.input}
    />
    </View>
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


  },
  input : {

    
    borderBottomColor : '#5585E8',
    backgroundColor : '#fff',
    fontSize : 16,

    
  }
});
export default SearchInput;