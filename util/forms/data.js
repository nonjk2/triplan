import { Value } from "react-native-reanimated";
import NaverMapView from "../../app/pages/map";

export const DummyDATA = [
    {
        nickname: '저녀니',
        image_id: 'one',
        freinds_id: "0001",
        introduce : "안녕하세요 난 저녀니입니다 dev_tez !!",
        source : 'https://img.insight.co.kr/static/2021/06/10/700/img_20210610080035_f201a223.webp'
    }, {
        nickname: '김쫀쀼',
        image_id: 'one',
        freinds_id: "0002",
        introduce : "안녕하세요 난 천재입니다 +_+ ",
        source : 'https://t1.daumcdn.net/cfile/tistory/990BE94C5BE7FC5E08'

    }, {
        nickname: '일본',
        image_id: 'one',
        freinds_id: "0003",
        introduce : "Tokyo, Japan",
        source : 'https://ko.skyticket.com/guide/wp-content/uploads/2021/07/shutterstock_667925704-2fff.jpg'
    }, {
        nickname: '환이',
        image_id: 'one',
        freinds_id: "0004",
        introduce : "안녕하세여 저는 김 환 입 니 다 ?",
        source : 'https://www.cnbnews.com/data/photos/cdn/20210833/art_1629612303.jpg'
    }, {
        nickname: '은돌',
        image_id: 'one',
        freinds_id: "0005",
        introduce : "hi",
        source : 'https://images.khan.co.kr/article/2021/01/08/l_2021010802000388200068931.jpg'
    }, {
        nickname: '넌누구니',
        image_id: 'one',
        freinds_id: "0006",
        introduce : "i don't know who i Am",
        source : 'https://w.namu.la/s/f21af41d2334b16f5da4c187b6f38ee910673da611ac33ec15be826208cdce02afcb2cd7096414957ef6be53537b75547e8e279ad3400029da948e04b955fd33c7a382087a9a6e265553a7eb4e992dc8b11d3007a678a2d90cdf991e057c57e3'
    }
];

export const checkList = [
  {
    item_id : 1,
    item_name : '지갑',
    isSelected : true,
  },
  {
    item_id : 2,
    item_name : '수건',
    isSelected : false,
  },

  {
    item_id : 3,
    item_name : '장갑',
    isSelected : false,
  },
  {
    item_id : 4,
    item_name : '면허증',
    isSelected : false,
  },
  {
    item_id : 5,
    item_name : '주민등록증',
    isSelected : false,
  },
  {
    item_id : 6,
    item_name : '아몰랑',
    isSelected : false,
  },
  {
    item_id : 7,
    item_name : '현금',
    isSelected : false,
  },
]

export const PlanData = [
    {
      plan_id: 1,
      dday: '진행중',
      plantitle: '가족여행',
      startDatetime: 1639958400000,
      endDatetime: 1640304000000,
      source: '/Users/eun/triplan/src/assets/dummyImage/cloud.jpeg',
      id : 1,
    },
    {
      plan_id: 2,
      dday: '진행중',
      plantitle: '제주도 뿌시기!',
      startDatetime : 1639267200000,
      endDatetime: 1640304000000,
      source: '/Users/eun/triplan/src/assets/dummyImage/fall.jpeg',
      id : 2,
    },
    {
      plan_id: 3,
      dday: '7',
      plantitle: '친구들이랑~',
      startDatetime: 1639267200000,
      endDatetime: 1640304000000,
      source: '/Users/eun/triplan/src/assets/dummyImage/flower.jpeg',
      id : 3,
    },
    {
      plan_id: 4,
      dday: '67',
      plantitle: '목동친구들',
      startDatetime: 1639267200000,
      endDatetime: 1640304000000,
      source: '/Users/eun/triplan/src/assets/dummyImage/spring.jpeg',
      id : 4,
    },
    {
      plan_id: 5,
      dday: '39',
      plantitle: '애인이랑',
      startDatetime: 1640304000000,
      endDatetime: 1640304000000,
      source: '/Users/eun/triplan/src/assets/dummyImage/water.jpeg',
      id : 5,
    },
    // {
    //   dday: '60',
    //   plantitle: '여행 플랜명4',
    //   startDatetime: '2020-12-17',
    //   endDatetime: '2020-12-19',
    //   source: '/Users/eun/triplan/src/assets/dummyImage/cloud.jpeg',
    //   id : 6,
    // },
  ];

export const Scheduledata = [
  {
    schedule_id : 1,
    schedule_title : '한라산 뿌시기',
    price : 40000,
    startDatetime: 1639958400000,
    endDatetime: 1639274400000,
    memo : '오늘은 여기 꼭 등산하고 간다',
    map_id : 10,
    plan_id : 1, 

  },
  {
    schedule_id : 2,
    schedule_title : '복귀하자 가면서 여기음식점',
    price : 50000,
    startDatetime: 1639958400000,
    endDatetime: 1639281600000,
    memo : '오늘은 여기 꼭 등산하고 간다1',
    map_id : 10,
    plan_id : 1, 

  },
  {
    schedule_id : 3,
    schedule_title : '밥먹고 집들가자 힘들다',
    price : 300000,
    startDatetime: 1639958400000,
    endDatetime: 1639285200000,
    memo : '오늘은 여기 꼭 등산하고 간다2',
    map_id : 10,
    plan_id : 1, 

  },
  {
    schedule_id : 4,
    schedule_title : '집가서 한숨자고저녁준비',
    price : 100000,
    startDatetime: 1639958400000,
    endDatetime: 1639288800000,
    memo : '오늘은 여기 꼭 등산하고 간다3',
    map_id : 10,
    plan_id : 1, 

  },
  {
    schedule_id : 5,
    schedule_title : '저녁먹고 자자',
    price : 10000,
    startDatetime: 1640044800000,
    endDatetime: 1639303200000,
    memo : '오늘은 여기 꼭 등산하고 간다4',
    map_id : 10,
    plan_id : 1, 

  },
  {
    schedule_id : 6,
    schedule_title : 'asd',
    price : 10000,
    startDatetime: 1640044800000,
    endDatetime: 1639303200000,
    memo : '오늘은 여기 꼭 등산하고 간다4',
    map_id : 10,
    plan_id : 1, 

  },
  {
    schedule_id : 7,
    schedule_title : 'ff 자자',
    price : 10000,
    startDatetime: 1640044800000,
    endDatetime: 1639303200000,
    memo : '오늘은 여기 꼭 등산하고 간다4',
    map_id : 10,
    plan_id : 1, 

  },
  {
    schedule_id : 8,
    schedule_title : 'gg 자자',
    price : 10000,
    startDatetime: 1640044800000,
    endDatetime: 1639303200000,
    memo : '오늘은 여기 꼭 등산하고 간다4',
    map_id : 10,
    plan_id : 1, 

  },
  {
    schedule_id : 9,
    schedule_title : 'hh 자자',
    price : 10000,
    startDatetime: 1640044800000,
    endDatetime: 1639303200000,
    memo : '오늘은 여기 꼭 adf 간다4',
    map_id : 10,
    plan_id : 1, 

  },
  {
    schedule_id : 10,
    schedule_title : 'jj 자자',
    price : 10000,
    startDatetime: 1640044800000,
    endDatetime: 1639303200000,
    memo : '오늘은 여기 꼭 adsf 간다4',
    map_id : 10,
    plan_id : 1, 

  },
  {
    schedule_id : 11,
    schedule_title : '저녁먹고 자자',
    price : 10000,
    startDatetime: 1640044800000,
    endDatetime: 1639303200000,
    memo : '오늘은 여기 꼭 등산하고 간다4',
    map_id : 10,
    plan_id : 1, 

  },
  
]

export const User = 
  {
    member_id : 1,
    nameTag : '안녕안녕',
    email : 'trgf456@naver.com',
    nickname : '최은돌',
    password : 'dmstjr15',
    aboutMe : '안녕하세요 최은돌입니다 ㅎㅎ',
    memberImg_id : null,

  }





