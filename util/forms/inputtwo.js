import React from "react";
import { TextInput , StyleSheet , Text, View} from 'react-native';


const Inputtwo = (props) => (
    <View>
    <TextInput
        {...props}
    />
    </View>
)

const styles = StyleSheet.create({
    textname : {
        paddingLeft : 7,
        paddingBottom : 5,
        fontSize : 18,
        color : '#5585E8',
        fontWeight : '700',

    },

  container : {
    flex: 1,
    backgroundColor : '#fff',


  },
  input : {
    width : '100%',
    borderBottomColor : '#5585E8',
    fontSize : 16,
    padding : 5,
    
  }
});
export default Inputtwo;