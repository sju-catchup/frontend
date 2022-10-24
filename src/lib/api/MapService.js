import axios from "axios";
const BASE_URL = "https://fancy-heads-thank-175-196-45-162.loca.lt";
const USER_API_BASE_URL = "/cctv";
class MapService {
  viewAllCCTV() {
    return axios.get(BASE_URL + USER_API_BASE_URL);
  }
}
export default new MapService();
