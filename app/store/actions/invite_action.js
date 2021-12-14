import {
    INVITE_INSERT,
    INVITE_REMOVE
} from '../types';

export function inviteInsert(data){
    return{
        type:INVITE_INSERT,
        payload : {
            nickname: data.nickname,
            image_id: data.image_id,
            freinds_id: data.freinds_id,
            isSelected : data.isSelected,
            source : data.source
        }
    }
}

export function inviteDelete(){
    return{
        type : INVITE_REMOVE,
        payload : {
            nickname: '넌누구니',
            image_id: 'one',
            freinds_id: "0006",
            isSelected : false,
            source : ''
        }
    }
}