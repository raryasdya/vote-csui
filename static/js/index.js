const run = async () => {
  $.get("/stats", function (data) {
    if (data.length != 0) {
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
          text: "Statistik Pemilih",
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

$(document).on("click", ".open-modal", function () {
  const angkatanId = $(this).data("id");
  const action = "/" + angkatanId;
  const choice = $(this).attr("id");
  $("#formId").attr("action", action);
  $("#choice").html(choice);
});
