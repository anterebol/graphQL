;import express from 'express';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { register, jwt } from "./src/modules/regist/resolvers/regist";
import { tracks, deleteTrack, addTrack, track, updateTrack } from "./src/modules/tracks/resolvers/tracks";
import { albums, deleteAlbum, addAlbum, updateAlbum, album } from './src/modules/albums/service/albums';
import { genre, deleteGenre, addGenre, updateGenre, genres } from './src/modules/genres/resolvers/genres';
import { band, deleteBand, addBand, updateBand, bands } from './src/modules/bands/service/bands';
import { artist, deleteArtist, addArtist, updateArtist, artists } from './src/modules/artists/resolvers/artists';
import { favourites, addTrackToFavourites } from './src/modules/favourites/service/favourites';
import {getFavourites} from './src/requests/requests'
import fs from 'fs/promises';
import depthLimit from 'graphql-depth-limit';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const DEPTH = Number(process.env.DEPTH);

export const app = express();

async function start() {
  const registSchema = await fs.readFile('./src/modules/regist/schema/regist.graphql', { encoding: 'utf-8' });
  const trackSchema = await fs.readFile('./src/modules/tracks/schema/tracks.graphql', { encoding: 'utf-8' });
  const albumSchema = await fs.readFile('./src/modules/albums/schema/albums.graphql', { encoding: 'utf-8' });
  const artistSchema = await fs.readFile('./src/modules/artists/schema/artists.graphql', { encoding: 'utf-8' });
  const bandsSchema = await fs.readFile('./src/modules/bands/schema/bands.graphql', { encoding: 'utf-8' });
  const genreSchema = await fs.readFile('./src/modules/genres/schema/genres.graphql', { encoding: 'utf-8' });
  const favouritesSchema = await fs.readFile('./src/modules/favourites/schema/favourites.graphql', { encoding: 'utf-8' });
  const querySchema = await fs.readFile('./src/schemas/query.graphql', { encoding: 'utf-8' });
  const mutationSchema = await fs.readFile('./src/schemas/mutation.graphql', { encoding: 'utf-8' });
  
  
    const schema = buildSchema(registSchema + trackSchema + querySchema + mutationSchema + albumSchema + artistSchema + bandsSchema + genreSchema + favouritesSchema)
  
    app.use(cors());
  
    const root = {
      register, 
      jwt,
      tracks,
      addTrack,
      deleteTrack,
      track,
      updateTrack,
      albums,
      addAlbum,
      album,
      deleteAlbum,
      updateAlbum,
      genre,
      deleteGenre, 
      addGenre, 
      updateGenre, 
      genres,
      band,
      bands,
      deleteBand,
      addBand,
      updateBand,
      artist, 
      deleteArtist, 
      addArtist, 
      updateArtist, 
      artists,
      favourites,
      addTrackToFavourites
    }
  
    app.use('/graphql', graphqlHTTP({
      graphiql: true,
      schema,
      rootValue: root,
      validationRules: [depthLimit(DEPTH)]
    }));
    app.listen(PORT, () => console.log(`server work on port => ${PORT}`));
}

start();