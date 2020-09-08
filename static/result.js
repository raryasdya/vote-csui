const run = async () => {
  $.get("/result-data", function (data) {
    console.log(data);
    if (data.length != 0) {
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
          text: "Hasil Pemilihan Nama Angkatan CSUI 20XX",
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

window.onload = function () {
  run();
};
