
$(document).ready(function() {
  // --- our code goes here ---
 
  $('.new-tweet textarea').on("keyup",function() {

    let count = $(this).val().length;
    
    if (count > 140) {
      
      $('.counter').css('color','red');
    } else{
      $('.counter').css('color','black');
    }
    $('.counter').text(140 - count);
    
  });
  
});

