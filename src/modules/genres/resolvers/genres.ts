import { getAll, del, add, update } from "../../../requests/requests";
import { findAlbumFor } from "../../albums/controller/albums";
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.GENRES_PATH;

export const genres = async (ids = null) => {
  if (ids.length >= 0) {
    return await Promise.all(ids.map(async (id) => await findGenreFor({id})));
  } else {
    const res = await getAll(PATH);
    return res.data.items.map((item) => {
      item.id = item._id;
      return item;
    });
  }
}
export const deleteGenre = async (id) => {
  const res = await del(PATH, id);
  return res.data;
}
export const addGenre = async (data) => {
  const res = await add(PATH, data);
  return await findGenreFor({id: res.data._id});
}
export const updateGenre = async(data) => {
  const res = await update(PATH, data.data);
  return await findGenreFor({id: res.data._id});
}
export const genre = async(id) => {
  const res = await getAll(PATH);
  let data = res.data.items.filter(item => item._id === id.id)[0];
  data.id = data._id;
  return data;
}
export const findGenreFor = async(id) => {
  if (id.id) {
    const res = await getAll(PATH);
    const data = res.data.items.filter(item => item._id === id.id)[0];  
    data.id = data._id;
    return data;
  }
}