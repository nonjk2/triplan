import {INVITE_INSERT, INVITE_REMOVE} from '../types';

const initialState = [
  {
    nickname: 'asdadsasdasd',
    image_id: 'this is id',
    freinds_id: 1,
    isSelected: false,
    source:
      'https://images.khan.co.kr/article/2021/01/08/l_2021010802000388200068931.jpg',
  },
];

export default function (state = initialState, action) {
  switch (action.type) {
    case INVITE_INSERT:
      return state.concat(action.payload);

    case INVITE_REMOVE:
      return initialState;

    default:
      return state;
  }
}
