$(function(){
  //功能1 发送ajax请求，获取数据渲染导航
  $.ajax({
    url:'http://127.0.0.1:9090/api/getindexmenu',
    dataType:'json',
    type:'get',
    data:{},
    success:function( info ) {
      console.log(info);
      var str = template('tmp',info);
      $('.row').html(str);
      //功能2 点击隐藏和出现更多
      $('.row').on('click','div[indexmenuId="7"]',function(){
        $('.row').toggleClass('contains');
      })
    }
  })
  //功能3 发送ajax请求，获取数据渲染产品
  $.ajax({
    url:'http://127.0.0.1:9090/api/getmoneyctrl',
    data:{},
    dataType:'json',
    type:'get',
    success:function( info ) {
      console.log(info);
      var str = template('tmp1',info);
      $('.product_list').html(str);
    }
  })
})