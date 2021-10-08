
//  import $ from "jquery";

$(document).ready(function() {
  // --- our code goes here ---
  let count = 0;
  $('.new-tweet textarea').on("keyup",function() {

    let count = $(this).val().length;
    $('.counter').text(count);
    if (count > 140) {
      $('.counter').text(140 - count);
      $('.counter').css('color','red');
    } else{
      $('.counter').css('color','black');
    }
      
  });
});

