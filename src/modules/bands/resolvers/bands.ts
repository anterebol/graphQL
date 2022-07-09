import { getAll, del, add, update } from "../../../requests/requests";
import { findGenreFor } from "../../genres/resolvers/genres";
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.BANDS_PATH;

export const bands = async () => {
  const res = await getAll(PATH);
  const answer = await Promise.all(res.data.items.map(async (item) => {
    item.genres = await Promise.all(item.genresIds.map(async (id) => await findGenreFor({id})));
    return item;
  }));
  return answer;
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
  let answer = res.data.items.filter(item => item._id === id.id);
  answer[0].genres = await Promise.all(answer[0].genresIds.map(async (id) => await findGenreFor({id})));
  return answer[0];
}
export const findBandFor = async(id) => {
  const res = await getAll(PATH);
  const data = res.data.items.filter(item => item._id === id.id);
  return data[0];
}
