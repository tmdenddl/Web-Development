$("h1").addClass("big-title margin-50");

$("a").attr("href", "https://www.naver.com");

$("h1").mouseover(function() {
  $("h1").text("Bye");
});

$(document).keypress(function(event) {
  $("h1").text(event.key);
});

$("h1").on("click", function() {
  if ($("h1").css("color") === "rgb(255, 255, 0)") {
    $("h1").css("color", "purple");
  } else {
    $("h1").css("color", "black");
  }
});

$("button").on("click", function() {
  $("a").fadeToggle();
});
