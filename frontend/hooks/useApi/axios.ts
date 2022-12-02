import axios from "axios";

export function axiosSetUp() {
  axios.defaults.baseURL = "http://localhost:4000/api";
}

let set = false;
export default (() => {
  if (!set) {
    axiosSetUp();
    set = true;
  }
  return axios;
})();
