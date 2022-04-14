const SECRET_KEY = '13092003';
const BASE_URL = 'https://sampledocumentapi.herokuapp.com';
// const BASE_URL = 'http://192.168.2.117:8081';
export { SECRET_KEY, BASE_URL };
export default function generateToken(key) {
  return btoa(`${key}${SECRET_KEY}`);
}
