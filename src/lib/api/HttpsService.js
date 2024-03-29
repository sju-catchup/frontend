import axios from "axios";
const BASE_URL = "https://api.rojiwon.kr";
class HttpsService {
  viewAllCCTV() {
    return axios.get(BASE_URL + "/cctv", {
      headers: {
        "ngrok-skip-browser-warning": "*",
      },
    });
  }
  viewAllRecord() {
    return axios.get(BASE_URL + "/human-action", {
      headers: {
        "ngrok-skip-browser-warning": "*",
      },
    });
  }
  findAllSuspect(id, start, end) {
    let data = {
      cctv_id: id,
      start_time: start,
      end_time: end,
    };
    return axios.post(BASE_URL + "/tracking/suspect", data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
  findHumanAction() {
    return axios.get(BASE_URL + "/human-action");
  }
}
export default new HttpsService();
