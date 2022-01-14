import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import { Scheduledata } from '../../../../../util/forms/data';
import ScheduleListitems from './scheduleListitem'; 
import { HiddenItemWithAction } from './scheduleSwipe';


const DATA = Scheduledata
export default function ScheduleList(props) {
    useEffect(()=>
      console.log(listData),


    )
    const {startDate,navigation} = props
    const [listData] = useState(
      DATA
      .map((_, i) => ({...DATA[i],key: `${i}`}))
      .filter(e => new Date(e.startDatetime).getDate() == startDate)

    );
    const openRowRef = useRef(null);
    const onRowDidOpen = (rowKey, rowMap) => {
        openRowRef.current = rowMap[rowKey];
    };
    
  
    const closeOpenRow = () => {
        if (openRowRef.current && openRowRef.current.closeRow) {
            openRowRef.current.closeRow();
        }
    };

    const renderItem = ({item}) => (

        <ScheduleListitems
          data={item}
          schedule_id={item.schedule_id}
          title={item.schedule_title}
          price={item.price}
          startDatetime={item.startDatetime}
          endDatetime={item.endDatetime}
          memo={item.memo}
          navigation= {navigation}
        />
     );

    const renderHiddenItem = (data,rowMap) => (
        <HiddenItemWithAction
        data={data}
        rowMap={rowMap}
        onClose={()=>this.closeRow(rowMap, data.item.schedule_id)}
        onDelete = {()=> deleterow(rowMap, data.schedule_id )}
        // onLeftAction = {()=>this.onLeftAction(rowMap)}
        // leftActionActivated

      />
    );

    return (
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