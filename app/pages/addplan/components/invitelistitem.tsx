import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
function InviteListItems(props: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <View style={styles.listbutton}>
        <TouchableOpacity>
          <View style={styles.invitecontain}>
            <Image
              source={{uri: props.source}}
              style={styles.invitelistimage}
            />
            <Text
              style={{
                position: 'absolute',
                fontSize: 18,
                color: '#fff',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listbutton: {
    justifyContent: 'center',
    margin: 5,
  },
  invitelistimage: {
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  invitecontain: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InviteListItems;
