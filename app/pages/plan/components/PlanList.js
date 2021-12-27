import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PlanListItems from './PlanListItem';
import { PlanData } from '../../../../util/forms/data';
const DATA = PlanData
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
        plan_id = {item.plan_id}
        source={item.source}
        title={item.plantitle}
        startDatetime={item.startDatetime}
        endDatetime={item.endDatetime}
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
