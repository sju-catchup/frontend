import axios from "axios";
const base_url = "https://6486-115-91-214-2.jp.ngrok.io";
const USER_API_BASE_URL = "/human-action";
class RecordService {
  viewAllRecord() {
    return axios.get(base_url + USER_API_BASE_URL);
  }
}
export default new RecordService();
// import axios from "axios";
// //const USER_API_BASE_URL = "/api";
// class RecordService {
//   viewAllRecord() {
//     return axios.get("/HumanAction", JSON.stringify(), {
//       //human_action
//       headers: {
//         "Content-Type": `application/json`,
//       },
//     });
//   }
// }
// export default new RecordService();
