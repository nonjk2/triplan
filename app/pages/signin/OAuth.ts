const CLIENT_ID = 'f830ac604b909cbe2f28044801646ad4';
const REDIRECT_URI = 'http://localhost:8081/auth/kakao/callback';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
