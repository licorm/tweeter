//check if document is ready
$(document).ready(function() {
  //event handler for input in tweet-text
  $("#tweet-text").on("input", function() {
    const $counter = $(this).parents().find(".counter");
    const $inputLength = $(this).val().length;
    $counter.val(140 - $inputLength);
    //counter color === red when below 0
    if ($counter.val() < 1) {
      $counter.css("color", "crimson");
    }
    if ($counter.val() > 1) {
      $counter.css("color", "purple");
    }
  })
});

