import { getAll, del, add, update } from "../../../requests/requests";
import { findTrackFor, tracks } from "../../tracks/resolvers/tracks";
import { genres } from "../../genres/resolvers/genres";
import { bands } from "../../bands/resolvers/bands";
import { artists } from "../../artists/resolvers/artists";
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.ALBUM_PATH;
const DEPTH = Number(process.env.DEPTH);

export const albums = async (id = null, depth = 0) => {
  if (typeof depth !== "number") {
    depth = 0;
  }
  if (depth < DEPTH) {
    depth++
    if (id.id) {
      return await findAlbumFor(id);
    } else {
      const res = await getAll(PATH);
      const data = await Promise.all(res.data.items.map(async (item) => {
        item.tracks = await tracks(item.trackIds, depth);
        item.genres = await genres(item.genresIds);
        item.bands = await bands(item.bandsIds);
        item.artists = await artists(item.artistsIds);
        return item;
      }))
      return data;
    }
  }
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
  if (id.id) {
    const res = await getAll(PATH);
    const data = res.data.items.filter(item => item._id === id.id)[0];
    data.tracks = await tracks(data.trackIds);
    data.bands = await bands(data.bandsIds);
    data.genres = await genres(data.genresIds);
    data.artists = await artists(data.artistsIds);
    return data;
  }
}

export const findAlbumFor = async(id, depth = 0) => {
  if (id.id) {
    const res = await getAll(PATH);
    const data = res.data.items.filter(item => item._id === id.id)[0];
    data.tracks = await tracks(data.trackIds, depth);
    data.bands = await bands(data.bandsIds);
    data.genres = await genres(data.genresIds);
    data.artists = await artists(data.artistsIds);
    return data;
  }
}
