// Data use to create diagram
const URL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

// Canvas uses to draw diagram and its dimensions
const svg = d3.select("#canvas");
const w = parseInt(svg.style("width"));
const h = parseInt(svg.style("height"));
const [mt, mr, mb, ml] = [20, 20, 20, 20];

// Tooltip
const tooltip = d3.select("#tooltip");

document.addEventListener("DOMContentLoaded", () => {
  d3.json(URL)
    .then((result) => {
      drawTreeMap(result);
    })
    .catch((error) => {
      console.log(error);
      drawError();
    });
});

const drawTreeMap = (data) => {
  const root = d3.hierarchy(data).sum((d) => d.value);
  d3.treemap().size([w, h]).padding(1)(root);

  // Create a cell
  const cell = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attrs({
      class: "group",
      transform: (d) => `translate(${d.x0}, ${d.y0})`,
    });

  // Create a rect for each g element to hold data
  cell
    .append("rect")
    .attrs({
      id: (d) => d.data.id,
      class: "tile",
      width: (d) => d.x1 - d.x0,
      height: (d) => d.y1 - d.y0,
      "data-name": (d) => d.data.name,
      "data-category": (d) => d.data.category,
      "data-value": (d) => d.data.value,
      fill: "blue",
    })
    .on("mousemove", (e, d) => showTooltip(e, d))
    .on("mouseout", hideTooltip());

  // Add text
  cell
    .append("text")
    .attr("class", "tile-text")
    .selectAll("tspan")
    .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .enter()
    .append("tspan")
    .attrs({
      x: 5,
      y: (d, i) => 16 + 10 * i,
    })
    .text((d) => d);
};

const drawError = () => {
  svg
    .append("text")
    .attrs({ x: w / 2, y: h / 2, "text-anchor": "middle" })
    .text("Something went wrong!");
};

const showTooltip = (e, d) => {
  const innerHTML = `
    <p>Name: ${d.data.name}</p>
    <p>Category: ${d.data.category}</p>
  `;

  tooltip
    .style("display", "inline-block")
    .style("top", e.pageY - 50 + "px")
    .style("left", e.pageX + 20 + "px")
    .attr("data-value", d.data.value)
    .html(innerHTML);
};

const hideTooltip = () => {
  tooltip.style("display", "none");
};
