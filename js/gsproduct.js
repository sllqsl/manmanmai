$(function(){
//  功能实现点击上拉下拉
//渲染下拉列表区域
 $.ajax({
   url:'http://127.0.0.1:9090/api/getgsshoparea',
   data:{},
   dataType:'json',
   type:'get',
   success:function( info ) {
     console.log(info);
     var str = template('tmp1',info);
     $('.popcat ul').html(str); 
   }
 })
//渲染下拉列表商店
$.ajax({
  url:'http://127.0.0.1:9090/api/getgsshop',
  data:{},
  dataType:'json',
  type:'get',
  success:function( info ) {
    console.log(info);
    var str = template('tmp',info);
    $('.popsort ul').html(str);
  }
})
//下拉事件
$('.filiter ul li').click(function(){
  var id = $(this).data().id;
  $('div[z="'+id+'"]').toggleClass('on');
})
$('div[z]').on('click','li',function(){
 console.log($(this));
 var text = $(this).children().text();
 var z = $(this).parent().parent().attr('z');
 $('li[data-id='+z+']').children('a').children('span').text(text);
 $(this).addClass('on').siblings().removeClass('on').parent().parent().removeClass('on');
//  $(this).parent().parent().removeClass('on');  
 var areaId = 0;
 var shopId = 0;
 if ( z == '1' ) {
  shopId= $(this).attr('shopId')||0;
  console.log(shopId);
 }
 if ( z == '2' ) {
  areaId =  $(this).attr('areaId')||0;
  console.log(areaId);
 }
 render(shopId,areaId);
})
//渲染商品详情
render();
function render(a,b) {
  $.ajax({
    url:'http://127.0.0.1:9090/api/getgsproduct',
    data:{
      shopid:a||0,
      areaid:b||0
    },
    dataType:'json',
    type:'get',
    success:function( info ) {
      console.log(info);
      var str = template('tmp2',info);
      $('.bd ul').html(str);
    }
  })
}

})