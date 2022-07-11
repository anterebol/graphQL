import { getFavourites, updateFavourite } from "../../../requests/requests";
import { outputInfo } from "../controller/favourites";

export const favourites = async () => {
  const res = await getFavourites();
  return await outputInfo(res.data);
}
export const addTrackToFavourites = async (data) => {
  const res = await updateFavourite(data, "tracks");
  return await outputInfo(res.data);
}
export const addBandToFavourites = async (data) => {
  const res = await updateFavourite(data, "bands");
  return await outputInfo(res.data);
}
export const addArtistToFavourites = async (data) => {
  const res = await updateFavourite(data, "artists");
  return await outputInfo(res.data);
}
export const addGenreToFavourites = async (data) => {
  const res = await updateFavourite(data, "genres");
  return await outputInfo(res.data);
}