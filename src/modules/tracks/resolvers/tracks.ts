import { getAll, del, add, update } from "../../../requests/requests";
import { findBandFor, bands } from "../../bands/resolvers/bands";
import { findAlbumFor, albums } from "../../albums/resolvers/albums";
import { findGenreFor, genres } from "../../genres/resolvers/genres";
import { artists } from "../../artists/resolvers/artists";
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.TRACKS_PATH;
const DEPTH = Number(process.env.DEPTH);

export const tracks = async (ids = null, depth = 0) => {
  if (typeof depth !== "number") {
    depth = 0;
  }
  if (depth < DEPTH) {
    depth++
    if (ids.length >= 0) {
      return await Promise.all(ids.map(async (id) => await findTrackFor({id}, depth)));
    } else {
      const res = await getAll(PATH);
      const data = await Promise.all(res.data.items.map(async (item) => {
      item.album = await findAlbumFor({id: item.albumId}, depth);
      item.genres = await genres(item.genresIds);
      item.bands = await bands(item.bandsIds);
      item.artists = await artists(item.artistsIds);
      return item;
      }));
      return data;
    }
  }
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
  return res.data;
}
export const track = async(id, depth = 0) => {
  const res = await getAll(PATH);
  let data = res.data.items.filter(item => item._id === id.id);
  data[0].album = await findAlbumFor({id: data[0].albumId}, depth);
  data[0].genres = await genres(data[0].genresIds);
  data[0].bands = await bands(data[0].bandsIds);
  data[0].artists = await artists(data[0].artistsIds);
  return data;
}
export const findTrackFor = async(id, depth = 0) => {
  const res = await getAll(PATH);
  const data = res.data.items.filter(item => item._id === id.id)[0];
  data.album = await findAlbumFor({id: data.albumId}, depth);
  data.genres = await genres(data.genresIds);
  data.bands = await bands(data.bandsIds);
  data.artists = await artists(data.artistsIds);
  return data;
}