import { createCardMarkup } from "../markup";
import { addMarkup } from "../helpers";
import { allAlbumUsersEL } from "../refs";
import { getData } from "../api";

const params = new URLSearchParams(location.search);
const albums = params.get("albumid");
console.log(albums);

getData(`/photos?albumId=${albums}`)
  .then((response) => {
    const markup = createCardMarkup(response);
    addMarkup(allAlbumUsersEL, markup);
  })
  .catch((error) => error);
