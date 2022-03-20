import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';
// import {Scheduledata} from '../../../../../util/forms/data';
import {ServerURL} from '../../../../../util/misc';
import ScheduleListitems from './scheduleListitem';
import {HiddenItemWithAction} from './scheduleSwipe';

export default function ScheduleList(props: any) {
  const [loading, setloading] = useState(null) as any;
  const {navigation, plan_id} = props;
  const [listData, setlistData] = useState([]);
  const isFocused = useIsFocused();
  const GetPlanSchduleList = async () => {
    setloading(true);
    await axios
      .get(`${ServerURL}/schedules/${plan_id}`)
      .then(function (response) {
        setlistData(response.data.list);
      })
      .catch(function () {
        alert('실패');
      });
    setloading(false);
    // async await 함수를 사용할 때,
  };
  useEffect(() => {
    GetPlanSchduleList();
  }, [isFocused]);
  const openRowRef = useRef(null);
  const onRowDidOpen = (rowKey: any, rowMap: any) => {
    openRowRef.current = rowMap[rowKey];
  };

  // const closeOpenRow = () => {
  //   if (openRowRef.current && openRowRef.current.closeRow) {
  //     openRowRef.current.closeRow();
  //   }
  // };

  const renderItem = ({item}: any) => (
    <ScheduleListitems
      schedule_id={item.scheduleId}
      title={item.scheduleTitle}
      price={item.price}
      startDatetime={new Date(`${item.startDateTime}`)}
      endDatetime={item.endDateTime}
      memo={item.memo}
      navigation={navigation}
    />
  );
  const renderHiddenItem = (data: any, rowMap: any) => (
    <HiddenItemWithAction
      data={data}
      rowMap={rowMap}
      navigation={navigation}
      onClose={() => closeRow(rowMap, data.item.schedule_id)}
      onDelete={() => deleterow(rowMap, data.schedule_id)}
      // onLeftAction = {()=>this.onLeftAction(rowMap)}
      // leftActionActivated
    />
  );

  return loading ? (
    <></>
  ) : listData ? (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-92}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
      {/* <TouchableOpacity onPress={closeOpenRow} style={styles.closeButton}>
                <Text>Close Open Row</Text>
            </TouchableOpacity> */}
    </View>
  ) : (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>추가된 일정이 없습니다 일정을 추가해주세요 !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  closeButton: {
    backgroundColor: 'white',
    bottom: 30,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black',
    padding: 15,
    position: 'absolute',
    right: 30,
  },
});
function alert(_arg0: string) {
  throw new Error('Function not implemented.');
}

function deleterow(_rowMap: any, _schedule_id: any) {
  throw new Error('Function not implemented.');
}
function closeRow(_rowMap: any, _schedule_id: any) {
  throw new Error('Function not implemented.');
}
