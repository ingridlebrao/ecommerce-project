function tabActive() {
  let btns = document.getElementsByClassName("main__report-link");

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
      x: {
        grid: {
          color: 'white',
          tickColor: 'white',
        }
      }
    },
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          borderRadius: 5,
          boxWidth: 6,
          boxHeight: 16,
          usePointStyle: true,
        }
      },
      title: {
        display: false,
      }
    }
  }
};

const myChart = new Chart(ctx, config);

function activeClasses() {
  tabActive();
  buttonActive();
}

function main() {
  activeClasses();
  reveal();
}

main();
