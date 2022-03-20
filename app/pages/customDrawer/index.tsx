/* eslint-disable no-shadow */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import IonIcon from 'react-native-vector-icons/Ionicons';

function Sidebar(props: any) {
  const {source, DATA, endDate, startDate, name, planday} = props;
  const [activeSections, setactiveSection] = useState([]) as any;

  useEffect(() => {
    console.log(barData(DATA));
  });
  const barData = (DATA: any) => {
    const Newdata = [];
    for (let index = 0; index < planday; index++) {
      Newdata.push({
        data: DATA.filter(
          (e: any) =>
            new Date(e.startDatetime).getDate() ===
            new Date(startDate).getDate() + index,
        ),
        key: index,
        title: `DAY${index + 1}`,
      });
    }
    return Newdata;
  };
  const [sideDATA] = useState(barData(DATA));
  const _renderHeader = (section: any) => {
    return (
      <View
        style={{
          width: 215,
          height: 60,
          marginHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: sideDATA[0] === section ? 0 : 0.3,
        }}>
        <Text
          style={{
            marginRight: 10,
            fontSize: 16,
            lineHeight: 19,
            fontWeight: sideDATA[activeSections] === section ? '600' : '400',
            color: sideDATA[activeSections] === section ? '#5585E8' : '#000',
          }}>
          {section.title}
        </Text>
        {sideDATA[activeSections] === section ? (
          <IonIcon name="chevron-up-outline" size={24} color="#5585E8" />
        ) : (
          <IonIcon name="chevron-down-outline" size={24} />
        )}
      </View>
    );
  };
  const renderDrawerItem = ({item}: any) => {
    return (
      <Text
        style={{
          marginBottom: 10,
          fontSize: 15,
          fontWeight: '400',
          lineHeight: 20,
          color: '#767676',
        }}>
        {item.schedule_title}
      </Text>
    );
  };
  const _renderContent = (section: any) => {
    return (
      <View style={styles.content}>
        <FlatList
          scrollEnabled={false}
          data={section.data}
          renderItem={renderDrawerItem}
        />
      </View>
    );
  };

  const _updateSections = (activeSections: any) => {
    setactiveSection(activeSections);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{height: 234, justifyContent: 'flex-end'}}
        source={{uri: source}}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: 87,
            justifyContent: 'center',
          }}>
          <View style={{marginLeft: 24}}>
            <Text style={{color: '#fff', fontSize: 24, marginBottom: 3}}>
              {name}
            </Text>
            <Text style={{color: '#fff', fontSize: 15}}>
              {new Date(startDate).getMonth() + 1 + '월'}-
              {new Date(startDate).getDate() + '일'}~
              {new Date(endDate).getMonth() + 1 + '월'}-
              {new Date(endDate).getDate() + '일'}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={{flex: 2}}>
        <Accordion
          sections={sideDATA}
          activeSections={activeSections}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
          touchableComponent={TouchableOpacity}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '300',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default Sidebar;
