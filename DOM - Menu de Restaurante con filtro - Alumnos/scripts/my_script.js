const $d = document,
  $lista = $d.querySelector(".item-list"),
  $categorias = $d.querySelector(".btn-categorias");

const items = [
  {
    id: 1,
    name: "buttermilk pancakes",
    category: "desayuno",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    name: "diner double",
    category: "almuerzo",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    name: "godzilla milkshake",
    category: "batidos",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art item-img booth before they sold out organic viral.`,
  },
  {
    id: 4,
    name: "country delight",
    category: "desayuno",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    name: "egg attack",
    category: "almuerzo",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    name: "oreo dream",
    category: "almuerzo",
    price: 18.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    name: "american classic",
    category: "almuerzo",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    name: "quarantine buddy",
    category: "batidos",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const categorias = Array.from(new Set(items.map((item) => item.category)));

function renderPlatos(items) {
  $lista.innerHTML = items.reduce(
    (anterior, actual) =>
      anterior +
      `<article class="item">
      <img src="${actual.img}" alt="#" class="item-img" />
      <div class="item-info">
        <header>
          <h4>${actual.name}</h4>
          <h4 class="item-precio">${actual.price}</h4>
        </header>
        <p class="item-descripcion">${actual.desc}</p>
      </div>
    </article>`,
    ""
  );
}

function renderCategorias(categorias, selectId) {
  const todos = `<button type="button" class="btn-categoria" ${
    selectId == 0 ? "seleccionado" : ""
  } data-id="0">Todos</button>`;
  $categorias.innerHTML = categorias.reduce(
    (anterior, actual, i) =>
      anterior +
      `<button type="button" class="btn-categoria" ${
        i == selectId ? "seleccionado" : ""
      } data-id="${i + 1}">${actual}</button>`,
    todos
  );
}

$categorias.addEventListener("click", (ev) => {
  ev.preventDefault();

  let id = ev.target.dataset.id;
  let itemsFiltrados = []
  if (id) {
    itemsFiltrados = id == 0 ? items : items.filter((item) => item.category.toLowerCase() == ev.target.textContent.trim().toLowerCase());
  }
  renderPlatos(itemsFiltrados);
  renderCategorias(categorias, id);
});

$d.addEventListener("DOMContentLoaded", (ev) => {
  renderPlatos(items);
  renderCategorias(categorias, 0);
});
