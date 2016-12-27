// var StickyElement = function(node){
//   var doc = $(document), 
//       fixed = false,
//       anchor = node.find('.sticky-anchor'),
//       content = node.find('.sticky-content');
  
//   var onScroll = function(e){
//     var docTop = doc.scrollTop(),
//         anchorTop = anchor.offset().top;
//     if(docTop > anchorTop){
//       if(!fixed){
//         anchor.height(content.outerHeight());
//         content.addClass('fixed');        
//         fixed = true;
//       }
//     }  else   {
//       if(fixed){
//         anchor.height(0);
//         content.removeClass('fixed'); 
//         fixed = false;
//       }
//     }
//   };
  
//   $(window).on('scroll', onScroll);
// };
// var demo = new StickyElement($('#sticky'));

// $(".aside-left li").click(function(e) {
//   e.preventDefault();
//   $(".aside-left li").removeClass('active');
//   $(this).addClass('active');
// })

$(".nano").nanoScroller();

var x = 100;

$(".btn1").click(function(e) {
  e.preventDefault();
  $("hr").css('margin-left', '0');
})
$(".btn2").click(function(e) {
  e.preventDefault();
  $("hr").css('margin-left', '16.66%');
})
$(".btn3").click(function(e) {
  e.preventDefault();
  $("hr").css('margin-left', '33.6%');
})
$(".btn4").click(function(e) {
  e.preventDefault();
  $("hr").css('margin-left', '50.2%');
})
$(".btn5").click(function(e) {
  e.preventDefault();
  $("hr").css('margin-left', '66.9%');
})
$(".btn6").click(function(e) {
  e.preventDefault();
  $("hr").css('margin-left', '83.6%');
})