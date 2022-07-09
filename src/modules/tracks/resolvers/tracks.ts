import { getAll, del, add, update } from "../../../requests/requests";
import { findBandFor } from "../../bands/resolvers/bands";
import { findAlbumFor } from "../../albums/resolvers/albums";
import { findGenreFor } from "../../genres/resolvers/genres";
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.TRACKS_PATH;

export const tracks = async () => {
  const res = await getAll(PATH);
  const answer = await Promise.all(res.data.items.map(async (item) => {
    item.album = await findAlbumFor({id: item.albumId});
    item.genres = await Promise.all(item.genresIds.map(async (id) => await findGenreFor({id})));
    item.bands = await Promise.all(item.bandsIds.map(async (id) => await findBandFor({id})));
    return item;
  }));
  return answer;
}
export const deleteTrack = async (id) => {
  const res = await del(PATH, id);
  return res.data;
}
export const addTrack = async (data) => {
  const res = await add(PATH, data);
  return res.data;
}
export const updateTrack = async(data) => {
  const res = await update(PATH, data.data);
  console.log(res.data)
  return res.data;
}
export const track = async(id) => {
  const res = await getAll(PATH);
  let answer = res.data.items.filter(item => item._id === id.id);
  answer[0].album = await findAlbumFor({id: answer[0].albumId});
  answer[0].genres = await Promise.all(answer[0].genresIds.map(async (id) => await findGenreFor({id})));
  answer[0].bands = await Promise.all(answer[0].bandsIds.map(async (id) => await findGenreFor({id})));
  return answer;
}
export const findTrackFor = async(id) => {
  const res = await getAll(PATH);
  const d = res.data.items.filter(item => item._id === id.id);
  return d[0];
}