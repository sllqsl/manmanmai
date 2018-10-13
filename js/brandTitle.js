$(function(){
//  功能：获取数据，渲染列表
$.ajax({
  url:'http://127.0.0.1:9090/api/getbrandtitle',
  data:{},
  dataType:'json',
  type:'get',
  success:function( info ) {
    console.log(info);
    
  }
})
 



})