import { getAll, del, add, update } from "../../../requests/requests";
import { findAlbumFor } from "../../albums/resolvers/albums";
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.GENRES_PATH;

export const genres = async (ids = null) => {
  if (ids) {
    return await Promise.all(ids.map(async (id) => await findGenreFor({id})));
  } else {
    const res = await getAll(PATH);
    return res.data.items;
  }
}
export const deleteGenre = async (id) => {
  const res = await del(PATH, id);
  return res.data;
}
export const addGenre = async (data) => {
  const res = await add(PATH, data);
  return res.data;
}
export const updateGenre = async(data) => {
  const res = await update(PATH, data.data);
  return res.data;
}
export const genre = async(id) => {
  const res = await getAll(PATH);
  let answer = res.data.items.filter(item => item._id === id.id)[0];
  return answer;
}
export const findGenreFor = async(id) => {
  if (id.id) {
    const res = await getAll(PATH);
    const data = res.data.items.filter(item => item._id === id.id)[0];  
    return data;
  }
}