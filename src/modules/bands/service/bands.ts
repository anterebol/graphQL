import { getAll, del, add, update } from "../../../requests/requests";
import { findGenreFor, genres } from "../../genres/resolvers/genres";
import { findArtistFor } from "../../artists/resolvers/artists";
import { findBandFor, outputIdsBands, getBands } from "../controller/bands";
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.BANDS_PATH;

export const bands = async (ids = null, depth = 0) => {
  return await getBands(ids, depth)
}

export const deleteBand = async (id) => {
  const res = await del(PATH, id);
  return res.data;
}
export const addBand = async (data) => {
  const res = await add(PATH, data);
  return await findBandFor({id: res.data._id});
}
export const updateBand = async (data) => {
  const res = await update(PATH, data.data);
  return await findBandFor({id: res.data._id});
}
export const band = async(id) => {
  return await findBandFor(id);
}

