import { bands } from "../../bands/service/bands";
import { albums } from "../../albums/service/albums";
import { genres } from "../../genres/resolvers/genres";
import { artists } from "../../artists/resolvers/artists";
import { tracks } from "../../tracks/resolvers/tracks";

export const outputInfo = async (data) => {
  const output = data;
  output.id = output._id;
  output.bands = await bands(output.bandsIds);
  output.tracks = await tracks(output.tracksIds);
  output.genres = await genres(output.genresIds);
  output.artists = await artists(output.artistsIds);
  return output;
}
