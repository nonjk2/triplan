import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Textplanform from './components/textinput';
import InviteList from './components/invitelist';
import {DummyDATA} from '../../../util/forms/data';

const DATA = DummyDATA;

function AddplanScreen(props: any) {
  const [data] = useState(DATA);
  const [myTextInput] = useState('');

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <Textplanform {...props} myTextInput={myTextInput} />
      </View>
      <View style={styles.invitelist}>
        <InviteList data={data} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  invitelist: {
    flex: 2.5,
    backgroundColor: '#fff',
  },
  container: {
    flex: 3,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default AddplanScreen;
