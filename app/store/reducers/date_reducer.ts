import {DATE_INSERT} from '../types';

const initialState = [
  {
    firstday: '날짜를 선택해주세요',
    lastday: '날짜를 선택해주세요',
  },
];

export default function (state = [initialState], action) {
  switch (action.type) {
    case DATE_INSERT:
      return state.concat(action.payload);

    default:
      return state;
  }
}
