import qs from "qs";

const CLIENT_ID = "";
const ROOT_URL = "https://github.com/login/oauth/authorize";

export default {
  login() {
    const querysString = {
      client_id: CLIENT_ID,
      scope: "public_repo user:email"
    };

    window.location = `${ROOT_URL}?${qs.stringify(querysString)}`;
  }
};
