import { getAll, del, add, update } from "../../../requests/requests";
import { findGenreFor, genres } from "../../genres/resolvers/genres";
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.BANDS_PATH;
const DEPTH = Number(process.env.DEPTH);

export const bands = async (ids = null, depth = 0) => {
  if (typeof depth !== "number") {
    depth = 0;
  }
  if (depth < DEPTH) {
    depth++
    if (ids.length >= 0) {
      return await Promise.all(ids.map(async (id) => await findBandFor({id}, depth)));
    } else {
      const res = await getAll(PATH);
      const data = await Promise.all(res.data.items.map(async (item) => {
      item.genres = await genres(item.genresIds)
      return item;
      }));
      return data;
    }
  }
}

export const deleteBand = async (id) => {
  const res = await del(PATH, id);
  return res.data;
}
export const addBand = async (data) => {
  const res = await add(PATH, data);
  return res.data;
}
export const updateBand = async(data) => {
  const res = await update(PATH, data.data);
  return res.data;
}
export const band = async(id) => {
  const res = await getAll(PATH);
  let data = res.data.items.filter(item => item._id === id.id)[0];
  data.genres = await genres(data.genresIds);
  return data;
}
export const findBandFor = async(id, depth) => {
  const res = await getAll(PATH);
  const data = res.data.items.filter(item => item._id === id.id)[0];
  if (data) {
    data.genres = await genres(data.genresIds);
  }
  return data;
}
