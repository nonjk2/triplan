import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import ScheduleListitems from './scheduleListitem';
import { Scheduledata } from '../../../../util/forms/data';
const DATA = Scheduledata

class ScheduleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.schedulelist(DATA),
    };
  }

  renderSchedule = ({item}) => {
    return (
      <ScheduleListitems
        schedule_id={item.schedule_id}
        title={item.schedule_title}
        price={item.price}
        startDatetime={item.startDatetime}
        endDatetime={item.endDatetime}
        memo={item.memo}
        navigation= {this.props.navigation}
      />
    );
  };
  schedulelist = plans => {
    return plans.map(schedule => {
      return Object.assign(schedule, {key: schedule.key});
    });
  };

  render() {
    return (

        <FlatList
          data={this.state.data}
          renderItem={this.renderSchedule}
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

export default ScheduleList;
