$(function(){
 //功能1发送ajax请求获取数据，渲染产品详情
 var productid = getSearch('productid');
 $.ajax({
   url:'http://127.0.0.1:9090/api/getmoneyctrlproduct',
   data:{
    productid:productid
   },
   dataType:'json',
   type:'get',
   success:function( info ) {
     console.log(info);
     var str = template('tmp',info);
     $('.mproductshow').html(str);
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