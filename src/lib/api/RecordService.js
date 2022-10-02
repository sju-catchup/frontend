import axios from "axios";
//const USER_API_BASE_URL = "/api";
class RecordService {
  viewAllRecord() {
    return axios.get("/data", JSON.stringify(), {
      //human_action
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
}
export default new RecordService();
