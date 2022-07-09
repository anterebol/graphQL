import { registUser, loginUser } from "../../../requests/requests";
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.USER_PATH;

export const regist = async (data) => {
  const res = await registUser(data, PATH);
  return res.data;
}
export const login = async (data) => {
  const res = await loginUser(data, PATH);
  return res.data;
}
