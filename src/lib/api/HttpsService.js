import axios from "axios";
const BASE_URL = "https://violet-grapes-rest-106-101-129-129.loca.lt";
class HttpsService {
  viewAllCCTV() {
    return axios.get(BASE_URL + "/cctv");
  }
  viewAllRecord() {
    return axios.get(BASE_URL + "/human-action");
  }
}
export default new HttpsService();
