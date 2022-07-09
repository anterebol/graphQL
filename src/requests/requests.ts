import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const jwt = process.env.jwt;

export const registUser = async (data, url: string) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${url}/register`, 
      data: data.user,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}
export const loginUser = async (data, url: string) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${url}/login`, 
      data: data.login,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const getAll = async (url: string) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${url}?limit=100`, 
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const add = async (url, data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${url}`, 
      data: data.data,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const del = async (url: string, id) => {
  console.log(id)
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${url}/${id.id}`, 
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const update = async (url, data) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${url}/${data.id}`, 
      data: data.data,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}
