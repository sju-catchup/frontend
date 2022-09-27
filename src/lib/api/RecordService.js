import axios from "axios";
const USER_API_BASE_URL = "/api";
class RecordService {
  viewAllRecord() {
    return axios.get(USER_API_BASE_URL + "/human-action", JSON.stringify(), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
}
export default new RecordService();
