import {PLAN_NAME} from '../types';

export function plannameupdate(data: any) {
  return {
    type: PLAN_NAME,
    payload: {
      plannameupdate: data.planname,
    },
  };
}
