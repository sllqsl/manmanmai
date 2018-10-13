$(function(){
  $.ajax({
    url:'http://127.0.0.1:9090/api/getsitenav',
    data:{},
    dataType:'json',
    type:'get',
    success:function( info ) {
      console.log(info);
      var str = template('tmp',info);
      $('.link').html(str);
    }
  })
})