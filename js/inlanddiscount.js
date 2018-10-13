$(function(){
//  功能：发送ajax请求，渲染页面
$.ajax({
 url:'http://127.0.0.1:9090/api/getinlanddiscount',
 data:{},
 dataType:'json',
 type:'get',
 success:function( info ) {
    console.log(info);
    var str = template('tmp',info);
    $('.recommon-product ul').html(str); 
    }
  })
})