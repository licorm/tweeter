//check if document is ready
$(document).ready(function() {
  console.log('Ready!');
  //event handler for input in tweet-text
  $("#tweet-text").on("input", function() {
    const $counter = $(this).parents().find(".counter");
    const $inputLength = $(this).val().length;
    $counter.val(140 - $inputLength);
    //counter color === red when below 0
    if ($counter.val() < 0) {
      $counter.css("color", "crimson");
    }
  })
});

