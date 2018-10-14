$(function(){
  //品牌标题对应的十大品牌api
 var brandtitleid = getSearch('brandtitleid');
 $.ajax({
  url:'http://127.0.0.1:9090/api/getbrand',
  data:{
    brandtitleid:brandtitleid
  },
  dataType:'json',
  type:'get',
  success:function( info ) {
    console.log(info);
    var str = template('tmp',info);
    $('.row ul').html(str);
    $('.row ul em')[0]
  //  console.log($('.row ul em').eq(0));
   $('.row ul em').eq(0).addClass('top1');
   $('.row ul em').eq(1).addClass('top2');
   $('.row ul em').eq(2).addClass('top3');
  }
 })
 //品牌标题对应的十大品牌的销量排行商品列表api
 $.ajax({
   url:'http://127.0.0.1:9090/api/getbrandproductlist',
   data: {
    brandtitleid:brandtitleid
   },
   dataType:'json',
   type:'get',
   success:function( info ) {
     console.log(info);
     var str = template('tmp1',info);
     $('.product-list ul').html(str);
     var productId = $('.product-list li').eq(0).attr('productId');
    //  console.log(productId);
     $.ajax({
      url:'http://127.0.0.1:9090/api/getproductcom',
      data:{
        productid:productId
      },
      dataType:'json',
      type:'get',
      success:function( info ) {
        console.log(info);
        var str1 = template('tmp2',info);
        $('.bd ul').html(str1);
      }
    })
   }
 })






// 专门通过传递的参数, 可以解析出地址栏的参数值
function getSearch( name ) {
  var search = location.search; // ?name=pp&age=18&desc=%E5%B8%85

  // 解码成中文
  search = decodeURI( search ); // ?name=pp&age=18&desc=帅

  // 将 ? 去掉
  search = search.slice(1);  // name=pp&age=18&desc=帅

  // 根据 & 进行切割
  var arr = search.split( "&" );  // ["name=pp", "age=18", "desc=帅"]
  var obj = {};
  arr.forEach(function( v, i ) {  // v 就是每一项, ["name=pp"]
    var key = v.split("=")[0];
    var value = v.split("=")[1];
    obj[key] = value;
  });
  return obj[name];
}
})
