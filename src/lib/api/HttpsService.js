import axios from "axios";
const BASE_URL = "https://rare-squids-pick-175-196-45-162.loca.lt";
class HttpsService {
  viewAllCCTV() {
    return axios.get(BASE_URL + "/cctv");
  }
  viewAllRecord() {
    return axios.get(BASE_URL + "/human-action");
  }
}
export default new HttpsService();
