import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigation} from './routes';

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
  }
}
export default App;
