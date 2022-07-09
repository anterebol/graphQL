import { getAll, del, add, update } from "../../../requests/requests";
import { findTrackFor } from "../../tracks/resolvers/tracks";
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.ALBUM_PATH;

export const albums = async () => {
  const res = await getAll(PATH);
  const answer = await Promise.all(res.data.items.map(async (item) => {
    item.tracks = await Promise.all(item.trackIds.map(async (id) => await findTrackFor({id})));
    return item;
  }))
  return answer;
}
export const deleteAlbum = async (id) => {
  const res = await del(PATH, id);
  return res.data;
}
export const addAlbum = async (data) => {
  const res = await add(PATH, data);
  return res.data;
}
export const updateAlbum = async(data) => {
  const res = await update(PATH, data.data);
  return res.data;
}
export const album = async(id) => {
  const res = await getAll(PATH);
  let answer = res.data.items.filter(item => item._id === id.id)[0];
  answer.tracks = await Promise.all(answer.trackIds.map(async (id) => await findTrackFor({id})));
  return answer;
}

export const findAlbumFor = async(id) => {
  const res = await getAll(PATH);
  const d = res.data.items.filter(item => item._id === id.id);
  return d[0];
}
