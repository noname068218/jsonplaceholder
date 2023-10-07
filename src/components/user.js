import { markupByUserId, createListAlbum } from "../markup";
import { addMarkup } from "../helpers";
import { getData } from "../api";
import { tbodyEl, albumMarkupEl, inputEl } from "../refs";

albumMarkupEl.addEventListener("click", getAlbumId);
inputEl.addEventListener("input", oneInput);
let items = [];
const params = new URLSearchParams(location.search);
const userId = params.get("userid");

getData(`/users/${userId}`)
  .then((response) => {
    const markup = markupByUserId(response);
    addMarkup(tbodyEl, markup);
  })
  .catch((error) => error);

getData(`/albums?userId=${userId}`)
  .then((response) => {
    items = response;
    const markup = createListAlbum(response);
    addMarkup(albumMarkupEl, markup);
  })
  .catch((error) => error);
function getAlbumId(e) {
  const valueId = e.target.closest(".js-list-user-album").dataset.id;

  if (!valueId) {
    return;
  }
  location.href = `album.html?albumid=${valueId}`;
}
function oneInput(event) {
  const value = event.target.value.trim().toUpperCase();
  let filterData = items.filter(({ title }) =>
    title.toUpperCase().includes(value)
  );
  if (value) {
    const markup = createListAlbum(filterData);
    addMarkup(albumMarkupEl, markup);
  } else {
    const markup = createListAlbum(items);
    addMarkup(albumMarkupEl, markup);
  }
}
