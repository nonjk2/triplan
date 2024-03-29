/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from 'react-native';
import SearchInput from '../../../../util/forms/input';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import {inviteInsert, inviteDelete} from '../../../store/actions/invite_action';
import {bindActionCreators} from 'redux';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = Dimensions.get('window').height;
class InviteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: '#fff',
      isModalVisible: this.props,
      data: this.props.data,
      data2: this.props.data,
      search: '',
    };
  }

  checkboxtruefalse = () => {
    const modalchecked = this.props.invite;
    const {data} = this.state;
    for (let i = 0; i < modalchecked.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (modalchecked[i].freinds_id === data[j].freinds_id) {
          const dataSelctturetwo = modalchecked[i].isSelected;
          this.setState({
            dataSelctture: dataSelctturetwo,
          });
        }
      }
    }
  };

  //검색창 입니다 ///
  searchFirends = text => {
    const {data} = this.state;
    if (text) {
      const newData = data.filter(item => {
        const itemData = item.nickname
          ? item.nickname.toUpperCase()
          : ''.toUpperCase();
        const TextData = text.toUpperCase();
        return itemData.indexOf(TextData) > -1;
      });
      this.setState({
        data2: newData,
      });
      this.setState({
        search: text,
      });
    } else {
      this.setState({
        data: data,
      });
      this.setState({
        search: text,
      });
    }
  };

  renderOutsideTouchable(onTouch) {
    const view = (
      <View onAnimationType="fade" style={{flex: 1, width: '100%'}} />
    );

    if (!onTouch) {
      return view;
    }
    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  renderTitle = () => {
    return (
      <View style={styles.modalTitle}>
        <View style={styles.modalTitleinside}>
          <IonIcon name="search" size={20} style={styles.modalIconLeft} />
          <View style={{flex: 1}}>
            <SearchInput
              value={this.state.search}
              onChangeText={text => this.searchFirends(text)}
              placeholder="친구이름#아이디번호"
              backgroundColor="#000"
              placeholderTextColor="#fff"
              color="#fff"
              borderRadius={5}
              style={{}}
            />
          </View>
          <Text style={styles.modalIconRight}>
            +{this.state.data.filter(e => e.isSelected === true).length}
          </Text>
        </View>
      </View>
    );
  };
  renderContent = (item, index) => {
    return (
      <View style={{marginTop: 10}}>
        <FlatList
          data={this.state.data2}
          renderItem={this.renderInviteModal}
          showsVerticalScrollIndicator={true}
          keyExtractor={i => `key-${i.freinds_id}`}
          style={{
            width: '100%',
            height: 510,
            paddingHorizontal: 8,
            backgroundColor: '#fff',
          }}
        />
        <View style={styles.wrapButton}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                this.state.data.filter(e => e.isSelected === true).length === 0
                  ? '#767676'
                  : '#5585E8',
              width: WIDTH - 32,
              height: 50,
              borderRadius: 10,
              zIndex: 6,
            }}
            onPress={this.onClickInvite}>
            <Text style={styles.compleatText}>완료</Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#ffffffAA',
              backfaceVisibility: 'hidden',
              display: 'flex',
              position: 'absolute',
              width: WIDTH,
              height: 100,
              alignItems: 'flex-start',
              bottom: -60,
              zIndex: 5,
            }}
          />
        </View>
      </View>
    );
  };

  checked = (item, index) => {
    const {data} = this.state;
    const newData = data.map(e => {
      if (e.nickname === item.nickname) {
        return {
          ...e,
          isSelected: !e.isSelected,
        };
      }
      return {
        ...e,
        isSelected: e.isSelected,
      };
    });

    this.setState({
      data: newData,
    });
    console.log(this.state.data);
  };

  renderInviteModal = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: item.isSelected ? 'rgba(85, 133, 232, 0.1)' : '#fff',
          marginVertical: 1,
          width: '100%',
          borderRadius: 10,
          height: 90,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '95%',
            height: 75,
          }}>
          <View style={styles.invitebutton}>
            <Image
              source={{uri: item.source}}
              style={{
                width: 80,
                height: 80,
                borderRadius: 15,
                flexWrap: 'wrap',
                borderColor: '#5585E8',
              }}
            />
            <View style={styles.invitecontain}>
              <View style={styles.inviteView}>
                <Text style={styles.friendsnamestyle}>
                  {item.nickname}#{item.id}
                </Text>
                <Text style={styles.friendsIntro}>{item.introduce}</Text>
              </View>
            </View>
          </View>
          <CheckBox
            style={styles.checkbox}
            value={item.isSelected}
            onValueChange={() => this.checked(item, index)}
            animationDuration={0.2}
            lineWidth={2}
            onCheckColor="#fff"
            onTintColor="#5585E8"
            onFillColor="#5585E8"
            offAnimationType="fill"
            onAnimationType="fill"
            tintColor="#5585E8"
          />
        </View>
      </View>
    );
  };

  onClickInvite = () => {
    const {data} = this.state;
    const {close} = this.props;
    const listSelected = data.filter(e => e.isSelected === true);
    this.props.inviteDelete();
    for (let key in listSelected) {
      this.props.inviteInsert(listSelected[key]);
    }
    close(data);
  };

  render() {
    const {onTouchOutside} = this.props;
    return (
      <View
        style={{
          width: WIDTH,
          height: 568,
          borderRadius: 10,
        }}>
        {this.renderOutsideTouchable(onTouchOutside)}
        <View style={styles.modalView}>
          <View style={{alignItems: 'center', height: 30}}>
            <IonIcon name="remove-sharp" size={30} style={{color: '#000'}} />
          </View>
          {this.renderTitle()}
          {this.renderContent()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 378,
    left: 16,
  },
  compleatButton: {},
  compleatText: {
    fontWeight: '400',
    color: '#fff',
    fontSize: 14,
  },
  modalView: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    // paddingHorizontal: 5,
    maxHeight: HEIGHT_MODAL,
  },
  modalTitle: {
    paddingVertical: 2,
    paddingHorizontal: 16,
  },
  modalTitleinside: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderWidth: 3,
    borderRadius: 5,
  },
  modalIconLeft: {
    flexWrap: 'wrap',
    zIndex: 999,
    color: '#fff',
    paddingLeft: 12,
  },
  modalIconRight: {
    flexWrap: 'wrap',
    paddingRight: 7,
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
  },
  checkbox: {
    height: 24,
    width: 24,
  },
  searchIcon: {
    flex: 1,
  },
  inviteModal: {
    flex: 1,
    justifyContent: 'flex-end',
    width: WIDTH,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invitebutton: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
  },
  invitelistimage: {},
  invitecontain: {
    flex: 2,
    marginLeft: 10,
    justifyContent: 'center',
  },
  ddaystyle: {
    backgroundColor: '#5585E8',
    borderRadius: 30,
    color: 'white',
  },
});
function mapStateToProps(state) {
  return {
    invite: state.invite,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({inviteInsert, inviteDelete}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteModal);
