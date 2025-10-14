const $d = document,
  $lista = $d.querySelector(".item-list"),
  $categoriasFiltrar = $d.querySelector(".btn-categorias"),
  $items = $d.querySelector("#item"),
  $categorias = $d.querySelector("#btn-categoria");

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
    category: "batidos",
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

function renderCategorias(categorias) {
  $categoriasFiltrar.innerHTML = categorias.reduce(
    (anterior, actual) =>
      anterior +
      `<button type="button" class="btn-categoria" data-id="#">${actual}</button>`,
    `<button type="button" class="btn-categoria" data-id="#">Todos</button>`
  );
}

$d.addEventListener("DOMContentLoaded", (ev) => {
  renderPlatos(items);
  renderCategorias(categorias);
});
