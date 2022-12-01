import axios from "axios";
const BASE_URL =
  "http://ec2-15-164-233-153.ap-northeast-2.compute.amazonaws.com:4000";
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
    // console.log("http: " + id, start, end);
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
