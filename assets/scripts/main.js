const API_USER = "https://test-final.b8one.academy/user";
const API_PROD = "https://test-final.b8one.academy/products/more-sold";
const API_SALES = "https://test-final.b8one.academy/sales";
const API_MENU = "https://test-final.b8one.academy/menu";
const API_RESELL = "https://test-final.b8one.academy/resellers/ranking";

// api . user
async function fetchUser() {
  const responseUser = await fetch(API_USER);
  const responseJsonUser = await responseUser.json();
  return responseJsonUser;
}

function populateUsers(currentUser, currentIndex) {
  const userOrg = document.querySelector(".header__name-whole");
  userOrg.innerHTML = currentUser.organization;

  const userName = document.querySelector(".header__nav-name");
  userName.innerHTML = currentUser.username;

  const userPhoto = document.querySelector(".header__user-img");
  userPhoto.innerHTML = `<img class="header__nav-img" referrer-policy="no-referrer" src="${currentUser.photo}" />`;

  const userOrgInitials = document.querySelector(".header__initials");
  userOrgInitials.innerHTML = `<img referrer-policy="no-referrer" src="https://ui-avatars.com/api/?name=${currentUser.organization}&rounded=true&format=svg&background=F1F2F9&color=425DC7&size=32&bold=true" />`

  const nameNotif = currentUser.username.split(' ').slice(0, 1).join(' ');
  const userNotif = document.querySelector(".header__user-link-span")
  userNotif.innerHTML = `Olá, <span class="span__user">${nameNotif}</span> 👋 `
}

// api . products
async function fetchProducts() {
  const responseProd = await fetch(API_PROD);
  const responseJsonProd = await responseProd.json();
  return responseJsonProd;
}

function populateProducts(products) {
  const productsListUl = document.querySelector(".js-insights__table");
  const productsHtmlArray = products.map((product, index) => {

    const price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price/100);

    return `
            <ul class="insights__table-row">
              <div class="insights-left">
              <li class="table-number">${index+1}</li>
              <li class="insights__table-row__item table-image"><img referrer-policy="no-referrer" src="${product.image}" /></li>
              <li class="insights__table-row__item table-product">${product.name}</li>
              </div>
              <div class="insights-right">
              <li class="insights__table-row__item table-order">${product.orderId}</li>
              <li class="insights__table-row__item table-department">${product.department}</li>
              <li class="insights__table-row__item table-value">${price}</li>
              <div>
            </ul>
          `;
  });

  const productsHtml = productsHtmlArray.join(" ");
  productsListUl.insertAdjacentHTML("beforeend", productsHtml);

}

function populateProductsMobile(productsMobile) {
  const productListMobile = document.querySelector(".table__mobile-wrapper");
  const productsHtmlArrayMobile = productsMobile.map((product, index) => {

    const price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price/100);

    return `
            <ul class="insights__table-row-mobile">
              <div class="table__mobile-top">
                <li class="table-img-mobile"><img referrer-policy="no-referrer" src=${product.image} /></li>
                <li class="insights__table-row__item-mobile table-product-mobile">${product.name}</li>
              </div>

              <div class="table__mobile-bottom">
                <li class="insights__table-row__item-mobile table-number">1</li>
                <li class="insights__table-row__item-mobile table-order-mobile">${product.orderId}</li>
                <li class="insights__table-row__item-mobile table-value-mobile"> ${price}</li>
              </div>
            </ul>
    `;
  });

  const productsHtmlMobile = productsHtmlArrayMobile.join(" ");
  productListMobile.insertAdjacentHTML("beforeend", productsHtmlMobile);

}

// api. sales
async function fetchSales() {
  const responseSales = await fetch(API_SALES);
  const responseJsonSales = await responseSales.json();
  return responseJsonSales;
}

function populateSales(currentSales, currentIndex) {
  const salesRevenue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentSales.revenues/100);
  const averageTicket = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentSales.averageTicket/100);


  const salesFaturamento = document.querySelector(".card__faturamento-valor");
  salesFaturamento.innerHTML = salesRevenue;

  const salesVendas = document.querySelector(".card__vendas-valor");
  salesVendas.innerHTML = currentSales.totalSales;

  const salesTicket = document.querySelector(".card__ticket-valor");
  salesTicket.innerHTML = averageTicket;
}

// api . menu
async function fetchMenu() {
  const responseMenu = await fetch(API_MENU);
  const responseMenuJson = await responseMenu.json();
  return responseMenuJson;
}

function populateMenu(menu, currentIndex) {
  const menuPosition = menu.menuTree[currentIndex];

  const menuResumo = document.querySelector(".accordion-resumo");
  menuResumo.innerHTML = menuPosition;
}


// api . resellers
async function fetchResellers() {
  const responseRanking = await fetch(API_RESELL);
  const responseJsonRank = await responseRanking.json();
  return responseJsonRank;
}

function populateResellers(resell) {
  const resellerListUl = document.querySelector(".ranking-scroll");
  const resellerHtmlArray = resell.map((resellers, index) => {
    return `
            <div class="ranking-cell">
              <div class="ranking-number">${index+1}°</div>
              <div class="ranking-photo"><img referrer-policy="no-referrer" src="https://ui-avatars.com/api/?name=${resellers.name}&rounded=true&format=svg&background=F1F2F9&color=425DC7&size=40" /></div>          
            
              <div class="ranking-name">
                <div class="ranking-name_header">${resellers.name}</div>
                <div class="ranking-numbers">
                  <div class="ranking-orders">${resellers.ordersCount} pedidos</div>
                  <div class="ranking-position">${resellers.percentage}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9998 9.5L7.99976 6.5L4.99976 9.5"
                            stroke="#158F2E" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
`;
  });

  const resellerHtml = resellerHtmlArray.join(" ");
  resellerListUl.insertAdjacentHTML("beforeend", resellerHtml);
}


// gráfico . 01

const ctx = document.getElementById("myChart").getContext("2d");
const labels = [
  "06/10/21",
  "07/10/21",
  "08/10/21",
  "09/10/21",
  "10/10/21",
  "11/10/21",
  "12/10/21",
];

const data = {
  labels,
  datasets: [
    {
      data: [25, 50, 60, 80, 150, 200, 145],
      label: "Estornado",
      fill: false,
      borderColor: "#425DC7",
      backgroundColor: "#425DC7",
      backgroundcolor: "transparent",
      borderWidth: 2,
      pointStyle: "circle",
    },
    {
      data: [60, 40, 150, 95, 100, 125, 90],
      label: "Cancelado",
      fill: false,
      borderColor: "#f03460",
      backgroundColor: "#f03460",
      borderWidth: 2,
      pointStyle: "circle",
    },
    {
      data: [0, 20, 0, 55, 200, 23, 45],
      label: "Não pago",
      fill: false,
      borderColor: "#FFBE00",
      backgroundColor: "#FFBE00",
      borderWidth: 2,
      pointStyle: "circle",
    },
    {
      data: [100, 60, 100, 0, 32, 50, 33],
      label: "Pago",
      fill: false,
      borderColor: "#158F2E",
      backgroundColor: "#158F2E",
      borderWidth: 2,
      pointStyle: "circle",
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          color: "white",
          tickColor: "white",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          boxWidth: 6,
          boxHeight: 16,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
    },
  },
};

const myChart = new Chart(ctx, config);

// grafico . 02 

const ctx2 = document.getElementById("myChart-2").getContext("2d");
const labels2 = [
  "06/10/21",
  "07/10/21",
  "08/10/21",
  "09/10/21",
  "10/10/21",
  "11/10/21",
  "12/10/21",
];

const data2 = {
  labels,
  datasets: [
    {
      data: [0, 60, 60, 120, 45, 180, 190],
      label: "Total de pedidos",
      fill: false,
      borderColor: "#425DC7",
      backgroundColor: "#425DC7",
      backgroundcolor: "transparent",
      borderWidth: 2,
      pointStyle: "circle",
    }
  ],
};

const config2 = {
  type: "line",
  data: data2,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          color: "white",
          tickColor: "white",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          boxWidth: 6,
          boxHeight: 16,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
    },
  },
};

const myChart2 = new Chart(ctx2, config2);

// gráfico . 03

const ctx3 = document.getElementById("myChart-3").getContext("2d");
const labels3 = [
  "06/10/21",
  "07/10/21",
  "08/10/21",
  "09/10/21",
  "10/10/21",
  "11/10/21",
  "12/10/21",
];

const data3 = {
  labels,
  datasets: [
    {
      data: [0, 60, 60, 120, 45, 180, 190],
      label: "Valor total de vendas",
      fill: false,
      borderColor: "#425DC7",
      backgroundColor: "#425DC7",
      backgroundcolor: "transparent",
      borderWidth: 2,
      pointStyle: "circle",
    },
    {
      data: [0, 60, 60, 120, 45, 180, 190],
      label: "Quantidade de pedidos",
      fill: false,
      borderColor: "#158F2E",
      backgroundColor: "#158F2E",
      backgroundcolor: "transparent",
      borderWidth: 2,
      pointStyle: "circle",
    },
    {
      data: [0, 60, 60, 120, 45, 180, 190],
      label: "Comissão a pagar",
      fill: false,
      borderColor: "#f03460",
      backgroundColor: "#f03460",
      backgroundcolor: "transparent",
      borderWidth: 2,
      pointStyle: "circle",
    },
  ],
};

const config3 = {
  type: "line",
  data: data2,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          color: "white",
          tickColor: "white",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          boxWidth: 6,
          boxHeight: 16,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
    },
  },
};

const myChart3 = new Chart(ctx3, config3);

// active

function tabActive() {
  let btns = document.getElementsByClassName("report-tab");

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("tab-active");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" tab-active", "");
      }
      this.className += " tab-active";
    });
  }
}

function buttonActive() {
  let btns = document.getElementsByClassName("main__data-button");

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      let current = document.getElementsByClassName(
        "main__data-button--active"
      );
      if (current.length > 0) {
        current[0].className = current[0].className.replace(
          " main__data-button--active",
          ""
        );
      }
      this.className += " main__data-button--active";
    });
  }
}

function reveal() {
  window.addEventListener("scroll", reveal);
  let reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = reveals[i].getBoundingClientRect().top;
    let reviewPoint = 150;

    if (revealTop < windowHeight - reviewPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

async function populate() {
  const dataProd = await fetchProducts();
  const dataUser = await fetchUser();
  const dataSales = await fetchSales();
  const dataResell = await fetchResellers();
  const dataMenu = await fetchMenu();

  populateProducts(dataProd.products);
  populateProductsMobile(dataProd.products);
  populateUsers(dataUser);
  populateSales(dataSales);
  populateResellers(dataResell.resellers);
  populateMenu(dataMenu.menuTree);
}

function activeClasses() {
  tabActive();
  buttonActive();
}

async function main() {
  populate();
  activeClasses();
  reveal();
}

main();
