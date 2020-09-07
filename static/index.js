$(document).on("click", ".open-modal", function () {
  var angkatanId = $(this).data("id");
  var action = "/" + angkatanId;
  var choice = $(this).attr("id");
  $("#formId").attr("action", action);
  $("#choice").html(choice);
});
