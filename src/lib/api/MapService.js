import axios from "axios";
const BASE_URL = "https://6486-115-91-214-2.jp.ngrok.io";
const USER_API_BASE_URL = "/cctv";
class MapService {
  viewAllRecord() {
    return axios.get(BASE_URL + USER_API_BASE_URL);
  }
}
export default new MapService();