import { server_ip } from "../enviroment_vars";
import axios from "axios";
import AuthenticationHeader from "./token";

export default class words {
  static async random_word() {
    const token = await AuthenticationHeader()
    return axios.get(`${server_ip}/word`, token)
  }
}