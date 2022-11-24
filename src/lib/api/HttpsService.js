import axios from "axios";
const BASE_URL = "https://79c4-175-196-45-162.ngrok.io";
class HttpsService {
  viewAllCCTV() {
    return axios.get(BASE_URL + "/cctv", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
  viewAllRecord() {
    return axios.get(BASE_URL + "/human-action", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
  findAllSuspect(id, start, end) {
    console.log("http: " + id, start, end);
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
