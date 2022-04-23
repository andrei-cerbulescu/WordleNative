import { server_ip } from "../enviroment_vars";
import axios from "axios";
import AuthenticationHeader from "./token";

export default class words {
  static async random_word() {
    const token = await AuthenticationHeader()
    return axios.get(`${server_ip}/word`, token)
  }

  static async suggest_word(data) {
    const token = await AuthenticationHeader()
    return axios.post(`${server_ip}/suggest_word`, data, token)
  }

  static async rate_word(data) {
    const token = await AuthenticationHeader()
    return axios.post(`${server_ip}/rate_word`, data, token)
  }
}