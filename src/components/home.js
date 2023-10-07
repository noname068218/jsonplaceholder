import { getData } from "../api";
import { markupUsers } from "../markup";
import { addMarkup } from "../helpers";
import { tableEl, inputEl } from "../refs";

tableEl.addEventListener("click", oneClickl);

let items = [];

getData("/users")
  .then((response) => {
    items = response;
    const markup = markupUsers(response);
    addMarkup(tableEl, markup);
  })
  .catch((error) => error);

function oneClickl(e) {
  const valueId = e.target.closest(".js-tr").dataset.userid;

  if (!valueId) {
    return;
  }
  location.href = `user.html?userid=${valueId}`;
}

inputEl.addEventListener("input", oneInput);

function oneInput(event) {
  const value = event.target.value.trim().toUpperCase();
  let filterData = items.filter(({ name }) =>
    name.toUpperCase().includes(value)
  );
  if (value) {
    const markup = markupUsers(filterData);
    addMarkup(tableEl, markup);
  } else {
    const markup = markupUsers(items);
    addMarkup(tableEl, markup);
  }
}
