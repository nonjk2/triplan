import React, {Component, useRef} from 'react';
import {StyleSheet, View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import { Scheduledata } from '../../../../util/forms/data';
import { SwipeListView } from 'react-native-swipe-list-view';
import Animated from 'react-native-reanimated';

const DATA = Scheduledata
const inputRef = React.createRef(null);

class ScheduleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.schedulelist(DATA)

    };
  }
  componentDidMount(){
  }
//   onRowDidOpen = (rowKey, rowMap) => {
//     inputRef.current = rowMap[rowKey];
// };
//  closeOpenRow = () => {
//   if (inputRef.current && inputRef.current.closeRow) {
//     inputRef.current.closeRow();
//   }
// };

  deleterow = (rowMap,rowkey) => {

  }

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
      console.log("asdasd:",rowMap)
      console.log("aaaaa:",rowKey)
      console.log(" bbbbb:",rowMap[rowKey])
  }else{
    console.log("fail:",rowMap,rowKey)
    console.log(rowMap[rowKey])
  }
  };
  renderSchedule = ({item},rowMap) => {
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
  
  onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };

  renderHiddenItem = (item,rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75)
    const rowHeightAnimatedValue = new Animated.Value(60)

    return (
      <></>
    )

  }
  schedulelist = plans => {
    const startDate = this.props.startDate
    const planschedule = plans.filter(e => new Date(e.startDatetime).getDate() == startDate)
    return planschedule.map(schedule => {
      return Object.assign(schedule, {key: schedule.key});
    });
  };

  

  render() {
    
    return (
            <SwipeListView
              data={this.state.data}
              renderItem={this.renderSchedule}
              // rightActivationValue = {-200}
              // leftActivationValue = {100}
              renderHiddenItem={this.renderHiddenItem}
              // leftOpenValue={75}
              // onRowDidOpen={this.onRowDidOpen}
              // closeOnRowOpen ={true}
              // closeOnRowPress={true}
              // previewRowKey={'0'}
              // previewOpenValue={-40}
              // previewOpenDelay={3000}



              
        />

        // <FlatList
        //   data={this.state.data}
        //   renderItem={this.renderSchedule}
        //   showsVerticalScrollIndicator={true}
        // //   ListHeaderComponent={
        // //     <View>
        // //       <Text>hhihihihihihihi</Text>
        // //     </View>
        // //   }
        // />

    );
  }
}

const styles = StyleSheet.create({});

export default ScheduleList;
