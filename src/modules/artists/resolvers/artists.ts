import { getAll, del, add, update } from "../../../requests/requests";
import { findBandFor } from "../../bands/controller/bands";
import { bands } from "../../bands/service/bands";

import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.ARTISTS_PATH;
const DEPTH = Number(process.env.DEPTH);

export const artists = async (ids = null, depth = 0) => {
  if (typeof depth !== "number") {
    depth = 0;
  }
  if (depth < DEPTH) {
    depth++
    if (ids.length >= 0) {
      return await Promise.all(ids.map(async (id) => await findArtistFor({id}, depth)));
    } else {
      const res = await getAll(PATH);
      const data = await Promise.all(res.data.items.map(async (item) => {
        item.id = item._id;
        item.bands = await bands(item.bandsIds);
        return item;
      }));
      return data;
    }
  }
}
export const deleteArtist = async (id) => {
  const res = await del(PATH, id);
  return res.data;
}
export const addArtist = async (data) => {
  const res = await add(PATH, data);
  return await findArtistFor({id: res.data._id});
}
export const updateArtist = async(data) => {
  const res = await update(PATH, data.data);
  return await findArtistFor({id: res.data._id});
}
export const artist = async(id, depth = 0) => {
  const res = await getAll(PATH);
  let data = res.data.items.filter(item => item._id === id.id);
  data[0].bands = await bands(data[0].bandsIds);
  return data;
}
export const findArtistFor = async(id, depth = 0) => {
  const res = await getAll(PATH);
  const data = res.data.items.filter(item => item._id === id.id)[0];
  data.id = data._id
  data.bands = await bands(data.bandsIds);
  return data;
}