import { getAll, del, add, update } from "../../../requests/requests";
import { findGenreFor, genres } from "../../genres/resolvers/genres";
import { findArtistFor} from "../../artists/resolvers/artists";
import dotenv from 'dotenv';
dotenv.config();

const PATH = process.env.BANDS_PATH;
const DEPTH = Number(process.env.DEPTH);

function checkUuid(id: string) {
  return /[0-9a-z]{24}/.exec(id);
}

export const findBandFor = async(id, depth = 0) => {
  const res = await getAll(PATH);
  const data = res.data.items.filter(item => item._id === id.id)[0];
  if (data) {
    data.id = data._id
    data.genres = await genres(data.genresIds);
    data.members = await Promise.all(data.members.map(async (member) => {
      if (checkUuid(member.artist)) {
        return {
          artist: await findArtistFor({id: member.artist}, depth),
          instrument: member.instrument,
          years: member.years
        }
      } else {
        return {
          instrument: member.instrument,
          years: member.years
        }
      }
    }));
    return data;
  }
}

export const outputIdsBands = async (ids, depth) => {
  return await Promise.all(ids.map(async (id) => await findBandFor({id}, depth)));
}

export const getBands = async (ids = null, depth = 0) => {
  if (typeof depth !== "number") {
    depth = 0;
  }
  if (depth < DEPTH) {
    depth++
    if (ids.length >= 0) {
      return await outputIdsBands(ids, depth)
    } else {
      const res = await getAll(PATH);
      const data = await Promise.all(res.data.items.map(async (item) => {
        item.id = item._id
        item.genres = await genres(item.genresIds);
        item.members = await Promise.all(item.members.map(async (member) => {
          if (checkUuid(member.artist)) {
            return {
              artist: await findArtistFor({id: member.artist}, depth),
              instrument: member.instrument,
              years: member.years
            }
          } else {
            return {
              instrument: member.instrument,
              years: member.years
            }
          }
        }));
        return item;
      }));
      return data;
    }
  }
}
