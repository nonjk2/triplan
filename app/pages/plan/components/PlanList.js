import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PlanListItems from './PlanListItem';
const DATA = [
  {
    dday: '진행중',
    planname: '여행 플랜명9',
    day: '12.15~12.18',
    source: 'one',
    id : 1,
  },
  {
    dday: '진행중',
    planname: '여행 플랜명1',
    day: '11.15~11.18',
    source: 'one',
    id : 2,
  },
  {
    dday: '7',
    planname: '여행 플랜명1',
    day: '11.15~11.18',
    source: 'one',
    id : 3,
  },
  {
    dday: '67',
    planname: '여행 플랜명2',
    day: '11.15~11.18',
    source: 'one',
    id : 4,
  },
  {
    dday: '완료',
    planname: '여행 플랜명3',
    day: '10.08 ~ 10.10',
    source: 'one',
    id : 5,
  },
  {
    dday: '완료',
    planname: '여행 플랜명4',
    day: '10.08 ~ 10.10',
    source: 'one',
    id : 6,
  },
];

class Planlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.planlist(DATA),
    };
  }

  renderPlan = ({item}) => {
    return (
      <PlanListItems
        source={item.source}
        planname={item.planname}
        day={item.day}
        dday={item.dday}
        navigation= {this.props.navigation}
      />
    );
  };
  planlist = plans => {
    return plans.map(plan => {
      return Object.assign(plan, {key: plan.key});
    });
  };

  render() {
    return (

        <FlatList
          data={this.state.data}
          renderItem={this.renderPlan}
          showsVerticalScrollIndicator={true}
        //   ListHeaderComponent={
        //     <View>
        //       <Text>hhihihihihihihi</Text>
        //     </View>
        //   }
        />

    );
  }
}

const styles = StyleSheet.create({});

export default Planlists;
