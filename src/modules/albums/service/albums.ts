import { getAll, del, add, update } from "../../../requests/requests";
import { findTrackFor, tracks } from "../../tracks/resolvers/tracks";
import { genres } from "../../genres/resolvers/genres";
import { bands } from "../../bands/service/bands";
import { artists } from "../../artists/resolvers/artists";
import { getAlbums, findAlbumFor } from "../controller/albums"
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.ALBUM_PATH;
const DEPTH = Number(process.env.DEPTH);

export const albums = async (id = null, depth = 0) => {
  return await getAlbums(id, depth);
}

export const deleteAlbum = async (id) => {
  const res = await del(PATH, id);
  return res.data;
}
export const addAlbum = async (data) => {
  const res = await add(PATH, data);
  return await findAlbumFor({id: res.data._id});
}
export const updateAlbum = async(data) => {
  const res = await update(PATH, data.data);
  return await findAlbumFor({id: res.data._id});
}
export const album = async(id) => {
  return await findAlbumFor(id);
}


