import { server_ip } from "../enviroment_vars";
import axios from "axios";
import AuthenticationHeader from "./token";

export default class user {
  static async get_current_user() {
    const token = await AuthenticationHeader()
    return axios.get(`${server_ip}/get_current_user`,
      token
    )
  }

  static login(data) {
    return axios.post(
      `${server_ip}/login`,
      data
    )
  }
}