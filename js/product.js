$(function(){
 var productid = getSearch('productid');
 var categoryid = getSearch('categoryid');
//  var str1;

 $.ajax({
   url:'http://127.0.0.1:9090/api/getproduct',
   data:{
    productid:productid
   },
   dataType:'json',
   type:'get',
   success:function( info ) {
     console.log(info);
     var str = template('tmp',info);
     $('.mprodetail').html(str);
     var str1 = template('tmp1',info);
     $('.bjshop').html(str1);
     str1 = info.result[0].productName.split(' ')[0]
     $.ajax({
      url:'http://127.0.0.1:9090/api/getcategorybyid',
      data:{
       categoryid:categoryid
      },
      type:'get',
      dataType:'json',
      success:function( info ) {
        console.log(info);
        var str = template('tmp3',info);
        $('.mdaohan ul').html(str + '<li><a href="javascript:;">'+str1+'</a></li>');
      }
    })
     
   }
 })

$.ajax({
  url:'http://127.0.0.1:9090/api/getproductcom',
  data:{
    productid :productid
  },
  type:'get',
  dataType:'json',
  success:function( info ) {
    console.log(info);
    var str = template('tmp2',info);
    $('.product-com-list ul').html(str);              
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