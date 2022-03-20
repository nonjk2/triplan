import {DATE_INSERT} from '../types';

export function dateInsert(data: any[]) {
  return {
    type: DATE_INSERT,
    payload: {
      firstday: data[0] || false,
      lastday: data[1] || data[0],
    },
  };
}
