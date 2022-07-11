import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

let jwt = process.env.jwt;

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
    jwt = res.data.jwt;
    console.log(jwt)
    return res;
  } catch (err) {
    console.log(err);
  }
}
export async function getFavourites() {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:3007/v1/favourites`, 
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
export async function getFavourite(id) {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:3007/v1/favourites/${id}`, 
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
export async function updateFavourite(data, type) {
  try {
    data.data.type = type; 
    const res = await axios({
      method: 'PUT',
      url: `http://localhost:3007/v1/favourites/add`, 
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
