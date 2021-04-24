const URL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

document.addEventListener("DOMContentLoaded", () => {
  d3.json(URL)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
