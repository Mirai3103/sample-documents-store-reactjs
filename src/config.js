const SECRET_KEY = '13092003';
const BASE_URL = 'http://localhost:8081';
export { SECRET_KEY, BASE_URL };
export default function generateToken(key) {
  return btoa(`${key}${SECRET_KEY}`);
}
