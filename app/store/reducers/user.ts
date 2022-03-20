import {SIGN_IN, SIGN_UP, AUTO_SIGN_IN} from '../types';

export default function (state = {}, action: any) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        auth: {
          accessToken: action.payload.accessToken || false,
          refreshToken: action.payload.refreshToken || false,
          email: action.payload.email || false,
          nickname: action.payload.nickname || false,
          aboutme: action.payload.aboutMe || false,
          nametag: action.payload.nametag || false,
          // memberId:action.payload.memberId || false
        },
      };
    case SIGN_UP:
      return {
        ...state,
        auth: {
          refreshToken: action.payload.refreshToken || false,
          email: action.payload.email || false,
          nickname: action.payload.nickname || false,
          aboutme: action.payload.aboutme || false,
          nametag: action.payload.nametag || false,
          token: action.payload.token || false,
        },
      };
    case AUTO_SIGN_IN:
      return {
        ...state,
        auth: {
          refreshToken: action.payload.refreshToken || false,
          accessToken: action.payload.accessToken || false,
          email: action.payload.email || false,
          nickname: action.payload.nickname || false,
          aboutme: action.payload.aboutMe || false,
          nametag: action.payload.nameTag || false,
          // memberId:action.payload.memberId || false
        },
      };

    default:
      return state;
  }
}
