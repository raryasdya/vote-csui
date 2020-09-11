const date = new Date();
const year = date.getFullYear();

const run = async () => {
  $.get("/result-data", function (data) {
    if (data.length != 0) {
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
          text: "Hasil Pemilihan Nama Angkatan CSUI " + year,
        },
        data: [
          {
            type: "pie",
            startAngle: 90,
            indexLabel: "{label} - {y}",
            dataPoints: data,
          },
        ],
      });
      chart.render();
    }
  });
};

window.onload = () => {
  run();
};
